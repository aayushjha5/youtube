import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWCKbAaUBFM8j3RgDVjNSjGfPatNkHn9A",
    authDomain: "video-cf50f.firebaseapp.com",
    projectId: "video-cf50f",
    storageBucket: "video-cf50f.appspot.com",
    messagingSenderId: "446150639689",
    appId: "1:446150639689:web:17f5141f7370842f9e7f98"
};

const app = initializeApp(firebaseConfig);

export const  auth = getAuth();

export const provider = new GoogleAuthProvider();

export default app;