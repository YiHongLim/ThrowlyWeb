// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
    initializeAuth,
    getAuth,
} from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDvE1cthbc9WHLJgxKpcD5nS5jvvKcg2Os",
    authDomain: "gutter-bc42f.firebaseapp.com",
    projectId: "gutter-bc42f",
    storageBucket: "gutter-bc42f.appspot.com",
    messagingSenderId: "540163816983",
    appId: "1:540163816983:web:dca000ec9a6dd0c3436652",
    measurementId: "G-X14P1RGSLM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const storageRef = getStorage(app);