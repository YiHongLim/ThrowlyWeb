import {getDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import {UserType} from "../types";

export async function fetchSpecificUser(id: string): Promise<UserType | null> {
    const docRef = doc(db, "Users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const user = {
            id: docSnap.id,
            ...docSnap.data()
        } as UserType;
        return user;
    } else {
        return null;
    }
}