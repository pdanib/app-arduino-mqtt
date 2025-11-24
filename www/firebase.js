// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-vyg-M0Xt3d8nDx5H-4oGQtbzvwc1DKk",
    authDomain: "appdelogin-e9923.firebaseapp.com",
    projectId: "appdelogin-e9923",
    storageBucket: "appdelogin-e9923.firebasestorage.app",
    messagingSenderId: "273118234439",
    appId: "1:273118234439:web:2e7829fa770c51a483ee62",
    measurementId: "G-SBZ5EE1993"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app };
export { auth };
