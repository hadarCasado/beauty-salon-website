import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { businessConfig } from './businessConfig';

const FirebaseConfig = {
  apiKey: "AIzaSyD4BUkkmlgnlag1n7SV8W5w2NSLRAa6gLU",
  authDomain: "business-template-demo.firebaseapp.com",
  projectId: "business-template-demo",
  storageBucket: "business-temple-demo.firebasestorage.app",
  messagingSenderId: "836201439624",
  appId: "1:836201439624:web:995176203d8be54f5c5a3d",
  measurementId: "G-QN3HCF2T0H"
}

const app = initializeApp(FirebaseConfig);

export const db = getFirestore(app);