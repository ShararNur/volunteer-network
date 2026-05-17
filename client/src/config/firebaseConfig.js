// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyDiCvVyZMLhiYcG__wmVTDnQB_Ccd35fVI',
  authDomain: 'volunteer-network-5c25a.firebaseapp.com',
  projectId: 'volunteer-network-5c25a',
  storageBucket: 'volunteer-network-5c25a.firebasestorage.app',
  messagingSenderId: '766610415321',
  appId: '1:766610415321:web:c4decbdbd682ba785da8c8',
  measurementId: 'G-S9R3V7BNXB',
});

// Initialize Firebase
export const auth = getAuth(firebaseConfig);
