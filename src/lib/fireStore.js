import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

export const addUserInfo = async (uid, name) => {
  const res = await setDoc(doc(db, "UserInfo", uid), {
    name: name
  }).then(() => {
    return { error: undefined }
  }).catch((error) => {
    console.log(error);
    return { error: error };
  });
  return res
}