import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7s1b206WEVKxpmaXE-cWuRnwFEQapGs0",
  authDomain: "musify-2c112.firebaseapp.com",
  projectId: "musify-2c112",
  storageBucket: "musify-2c112.firebasestorage.app",
  messagingSenderId: "146082962259",
  appId: "1:146082962259:web:02e1df9ee04523c8505fa6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const login = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login Failed", error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Failed", error);
  }
};

export { auth, provider, login, logout }; // ✅ Now provider is exported
