// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDeDXqZ4ickJ1Ybe1THh_I0AfxKOPOYlpI",
    authDomain: "findme-f8b2e.firebaseapp.com",
    projectId: "findme-f8b2e",
    storageBucket: "findme-f8b2e.firebasestorage.app",
    messagingSenderId: "1045043469077",
    appId: "1:1045043469077:web:5def5ae4c0d9001a1c271c",
    measurementId: "G-DSHT3TR639"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);