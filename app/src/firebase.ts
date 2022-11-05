import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAw1mCZWLICnmTeTowqT-R8axbxGe3FtIg",
    authDomain: "ship-me-fresh.firebaseapp.com",
    projectId: "ship-me-fresh",
    storageBucket: "ship-me-fresh.appspot.com",
    messagingSenderId: "697967022848",
    appId: "1:697967022848:web:edaa78700b2c5f1b98d9e5",
    measurementId: "G-7J24VGDBDR"
  };


const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export { db }