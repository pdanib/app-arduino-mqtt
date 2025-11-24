// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
    getAuth,
    signInAnonymously,
    signInWithCustomToken,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-vyg-M0Xt3d8nDx5H-4oGQtbzvwc1DKk",
    authDomain: "appdelogin-e9923.firebaseapp.com",
    projectId: "appdelogin-e9923",
    storageBucket: "appdelogin-e9923.firebasestorage.app",
    messagingSenderId: "273118234439",
    appId: "1:273118234439:web:2e7829fa770c51a483ee62",
    measurementId: "G-SBZ5EE1993"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app };
export { auth };