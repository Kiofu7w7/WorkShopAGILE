import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzSh8D4USkzfdgLYpe7Ngp4LIB7p4Zt1E",
    authDomain: "colombiahidro-eb088.firebaseapp.com",
    projectId: "colombiahidro-eb088",
    storageBucket: "colombiahidro-eb088.appspot.com",
    messagingSenderId: "530758757824",
    appId: "1:530758757824:web:703067bec2f01d33c9ac25",
    measurementId: "G-JW76CJ3C7L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Conectar un Google - autenticación
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
// Initialize Cloud Firestore and get a reference to the service
export const dataBase = getFirestore(app);