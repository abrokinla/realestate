import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


const firebaseConfig = {    
    apiKey: "AIzaSyDxJQPDj30NxH04yrWxUi2MdSxCdLCVw7Q",
    authDomain: "real-estate-5b11c.firebaseapp.com",
    projectId: "real-estate-5b11c",
    storageBucket: "real-estate-5b11c.appspot.com",
    messagingSenderId: "1053871517984",
    appId: "1:1053871517984:web:84a70f9120407fb3e56745",
    measurementId: "G-5W10Q28NTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = get.auth(app);
export { auth }