import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey:"AIzaSyCH907IQeFw0hlZl_9z2ybDW7r4VfitRkg",
  authDomain:"homefinder-80468.firebaseapp.com",
  projectId:"homefinder-80468",
  storageBucket:"homefinder-80468.appspot.com",
  messagingSenderId:"71284887333",
  appId:"1:71284887333:web:14c2917c4e8ccba2e514cc"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app); 


export default storage; 
