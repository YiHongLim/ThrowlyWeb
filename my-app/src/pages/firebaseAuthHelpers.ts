// firebaseAuthHelpers.ts
import { auth, db, storageRef } from "../firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
  User,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { ref as storageRefFn, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Check whether a username is available.
 * Uses `usernames/{username}` doc for O(1) lookup.
 */
export const isUsernameUnique = async (username: string): Promise<boolean> => {
  if (!username || !username.trim()) return false;
  const id = username.toLowerCase().trim();
  try {
    const snap = await getDoc(doc(db, "usernames", id));
    return !snap.exists();
  } catch (err) {
    console.error("isUsernameUnique error:", err);
    // conservative default: return false so UI prevents proceeding on uncertain state
    return false;
  }
};

/**
 * Upload an image / uri to Firebase Storage and return the download URL.
 * Works with RN/Expo blob approach (uri -> XHR -> blob), and web if you pass a File.
 *
 * uri: local file URI (expo) or data URL or remote url (RN downloads it).
 * imageName: path/name to store under e.g. "profilePics/username_12345.jpg"
 */
export const uploadImage = async (uri: string | File, imageName: string): Promise<string> => {
  // If a web File is provided, upload it directly
  let blob: Blob;

  if (typeof uri === "string") {
    // RN/Expo style: convert URI to blob via XHR
    blob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error("uploadImage XHR error", e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  } else {
    // uri is a File (web)
    blob = uri as File;
  }

  if (!storageRef) {
    console.error("Firebase storage is not available");
    throw new Error("Firebase storage not available");
  }

  const newRef = storageRefFn(storageRef, imageName);
  const snapshot = await uploadBytes(newRef, blob);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

/**
 * signUp(userObject)
 * - Creates the Auth user
 * - Atomically writes Users/{uid} and usernames/{username} inside a transaction
 * - If username collision or other failure occurs, deletes the created Auth user (cleanup)
 *
 * userObject must include at minimum: { email, password, username, firstName, lastName }
 * Optional: profilePicture (url), sex, birthday, location, numListings, score, preferences, isPrivateEmail, shouldUpdateProfile
 */
export const signUp = async (userObject: {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string | null;
  sex?: string | null;
  birthday?: string | null;
  numListings?: number;
  score?: number;
  preferences?: object;
  isPrivateEmail?: boolean;
  shouldUpdateProfile?: boolean;
}): Promise<{ success: boolean; uid?: string }> => {
  if (!userObject || !userObject.username || !userObject.email || !userObject.password || !userObject.firstName || !userObject.lastName) {
    throw new Error("Missing required signup fields");
  }

  const usernameId = userObject.username.toLowerCase().trim();
  let createdUser: User | null = null;

  try {
    // 1) create auth user (this signs them in on the client)
    const newUserCred = await createUserWithEmailAndPassword(auth, userObject.email, userObject.password);
    createdUser = newUserCred.user;
    const uid = createdUser.uid;

    // Prepare doc payload (remove password)
    const userDocData: any = {
      username: usernameId,
      email: userObject.email.toLowerCase(),
      firstName: userObject.firstName.trim(),
      lastName: userObject.lastName.trim(),
      profilePicture: userObject.profilePicture || null, // store as null instead of empty string
      sex: userObject.sex || null,
      birthday: userObject.birthday || null, // renamed from dob
      geohash: null, // will be calculated later if needed
      numListings: userObject.numListings ?? 0,
      score: userObject.score ?? 50,
      createdAt: new Date().toISOString(),
    };

    // 2) Transactionally claim username and write Users/{uid}
    await runTransaction(db, async (tx) => {
      const nameRef = doc(db, "usernames", usernameId);
      const nameSnap = await tx.get(nameRef);
      if (nameSnap.exists()) {
        throw new Error("USERNAME_TAKEN");
      }

      const userRef = doc(db, "Users", uid);
      tx.set(userRef, {
        ...userDocData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      tx.set(nameRef, {
        userId: uid,
        createdAt: serverTimestamp(),
      });
    });

    return { success: true, uid: createdUser.uid };
  } catch (err: any) {
    console.error("signUp error:", err);

    // Cleanup: if auth user created, delete it to avoid an orphan
    if (createdUser) {
      try {
        await firebaseDeleteUser(createdUser);
        console.log("Deleted orphan auth user after signup failure");
      } catch (delErr) {
        console.error("Failed to delete orphan auth user:", delErr);
        // If deletion fails, schedule server-side cleanup or review auth console
      }
    }

    // Map some errors to friendly codes/messages
    if (err.message === "USERNAME_TAKEN") {
      const e = new Error("USERNAME_TAKEN");
      // @ts-ignore attach code
      e.code = "USERNAME_TAKEN";
      throw e;
    }
    if (err.code === "auth/email-already-in-use") {
      const e = new Error("EMAIL_IN_USE");
      // @ts-ignore attach code
      e.code = "EMAIL_IN_USE";
      throw e;
    }

    throw err;
  }
};

/**
 * signInWithAppleWeb
 * - Web-only (works in browsers where Apple JS SDK / Firebase OAuth is supported)
 * - Redirects user to Apple login
 */
export const signInWithAppleWeb = async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
  
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Apple sign-in redirect error:", err);
      throw err;
    }
  };
  
  /**
   * Complete sign-in after redirect back from Apple
   * Call this once on app load (e.g. in your AuthProvider or App.tsx)
   */
  export const completeAppleRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        // result.user is the Firebase Auth user
        console.log("Apple sign-in success:", result.user);
        return result.user;
      }
      return null;
    } catch (err) {
      console.error("Apple sign-in result error:", err);
      throw err;
    }
  };