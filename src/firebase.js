import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_P_ID,
  storageBucket: process.env.REACT_APP_API_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_M_S_ID,
  appId: process.env.REACT_APP_API_APP_ID
};

const app = initializeApp(firebaseConfig);

export default app