import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "real-estate-app-d5537.appspot.com",
  // import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseurl: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const fileRef = ref(storage, "path/to/file");
// const uploadTask = uploadBytesResumable(fileRef, file);
// const downloadURL = await getDownloadURL(fileRef);

export { app, db, storage, ref, uploadBytesResumable, getDownloadURL }