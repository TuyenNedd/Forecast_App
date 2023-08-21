import { initializeApp } from "firebase/app";
import * as envVite from "../config/envVite.jsx";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  // apiKey: envVite.viteApi,
  authDomain: envVite.viteAuth,
  databaseURL: envVite.viteDatabase, // Update this URL
  projectId: envVite.viteProID,
  storageBucket: envVite.viteStoBucket,
  messagingSenderId: envVite.viteMessSenderID,
  appId: envVite.viteAppID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
