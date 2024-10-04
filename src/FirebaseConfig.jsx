import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCQLynTZz-MA2Gnx47mwUNcfRd89UN_q68",
    authDomain: "chat-app-8abff.firebaseapp.com",
    projectId: "chat-app-8abff",
    storageBucket: "chat-app-8abff.appspot.com",
    messagingSenderId: "604328074463",
    appId: "1:604328074463:web:dd0ec4af6ee9986a235d6a",
    measurementId: "G-RE4ZNH6G13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };