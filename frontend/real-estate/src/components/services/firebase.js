import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    "apiKey": "AIzaSyC1Fynp1Af2o2PPterFCWvyWWsdG1O51J4",
    "authDomain": "real-estate-e45dd.firebaseapp.com",
    "projectId": "real-estate-e45dd",
    "storageBucket": "real-estate-e45dd.appspot.com",
    "messagingSenderId": "799389364325",
    "appId": "1:799389364325:web:9fa1f13cabd5471e9ed68c",
    "measurementId": "G-0Z72D2ZCD6",  
    "databaseURL":"https://real-estate-e45dd-default-rtdb.firebaseio.com"  
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const fileRef = ref(storage, "path/to/file");
// const uploadTask = uploadBytesResumable(fileRef, file);
// const downloadURL = await getDownloadURL(fileRef);

export { app, db, storage, ref, uploadBytesResumable, getDownloadURL }