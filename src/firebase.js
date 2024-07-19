import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyC4mw8FE50ssFUWtat_GRW1BgRITgTNVts",
  authDomain: "test-management-6f388.firebaseapp.com",
  projectId: "test-management-6f388",
  storageBucket: "test-management-6f388.appspot.com",
  messagingSenderId: "985294184170",
  appId: "1:985294184170:web:2642a02a8c51dee2dd4193",
  measurementId: "G-E96LEQNSYB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

export { auth, firestore, functions };
