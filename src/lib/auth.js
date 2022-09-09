import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvQQ1F8SIjbXY3aKtWhlTZq8IZwYBFm2w",
  authDomain: "cloud-buster-cc6a7.firebaseapp.com",
  projectId: "cloud-buster-cc6a7",
  storageBucket: "cloud-buster-cc6a7.appspot.com",
  messagingSenderId: "27958890895",
  appId: "1:27958890895:web:a1f7c065f3fc0179afbbfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signup = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return { error: undefined, authInfo: { uid: user.uid, email: user.email } };
    })
    .catch((error) => {
      console.log(error);
      return { error: error };
    });
  return res;
};

export const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return { error: undefined, authInfo: { uid: user.uid, email: user.email } };
    })
    .catch((error) => {
      console.log(error);
      return { error: error };
    });
  return res;
};
