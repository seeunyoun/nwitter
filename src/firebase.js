import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_P_ID,
  storageBucket: process.env.REACT_APP_API_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_M_S_ID,
  appId: process.env.REACT_APP_API_APP_ID
}

const app = initializeApp(firebaseConfig)
const authService = getAuth(app)
export const dbService = getFirestore(app)

export const firebaseInstance = getAuth(app)
export default authService

export const storageService = getStorage(app)
export const storageRef = ref(storageService)