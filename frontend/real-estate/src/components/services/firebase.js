import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC1Fynp1Af2o2PPterFCWvyWWsdG1O51J4",
    authDomain: "real-estate-e45dd.firebaseapp.com",
    databaseURL: "https://real-estate-e45dd-default-rtdb.firebaseio.com",
    projectId: "real-estate-e45dd",
    storageBucket: "real-estate-e45dd.appspot.com",
    messagingSenderId: "799389364325",
    appId: "1:799389364325:web:9fa1f13cabd5471e9ed68c"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage, firebase as default
}
