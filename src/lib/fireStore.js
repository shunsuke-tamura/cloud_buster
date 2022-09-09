import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  limit,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvQQ1F8SIjbXY3aKtWhlTZq8IZwYBFm2w",
  authDomain: "cloud-buster-cc6a7.firebaseapp.com",
  projectId: "cloud-buster-cc6a7",
  storageBucket: "cloud-buster-cc6a7.appspot.com",
  messagingSenderId: "27958890895",
  appId: "1:27958890895:web:a1f7c065f3fc0179afbbfa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addUserInfo = async (uid, name, cloud) => {
  const res = await setDoc(doc(db, "UserInfo", uid), {
    name: name,
    cloud: cloud
  })
    .then(() => {
      return { error: undefined };
    })
    .catch((error) => {
      console.log(error);
      return { error: error };
    });
  return res;
};

export const getUserInfo = async (uid) => {
  const docSnap = await getDoc(doc(db, "UserInfo", uid));
  return docSnap.data();
};

export const addCloudValueChange = async (to, from, value, userInfo) => {
  // 勝ったほうにプラスする
  let ref = collection(db, to);
  let q = query(ref, orderBy("dateTime", "desc"), limit(1));
  let latestSnapshots = await getDocs(q);
  await addDoc(ref, {
    change: value,
    dateTime: Timestamp.fromDate(new Date()),
    total: latestSnapshots.docs[0].data().total + value,
    uid: userInfo.uid,
    uname: userInfo.name,
  });

  // 負けたほうからマイナスする(0未満にはしない)
  ref = collection(db, from);
  q = query(ref, orderBy("dateTime", "desc"), limit(1));
  latestSnapshots = await getDocs(q);
  if (latestSnapshots.docs[0].data().total - value < 0) {
    await addDoc(ref, {
      change: -latestSnapshots.docs[0].data().total,
      dateTime: Timestamp.fromDate(new Date()),
      total: 0,
      uid: userInfo.uid,
      uname: userInfo.name,
    });
  } else {
    await addDoc(ref, {
      change: -value,
      dateTime: Timestamp.fromDate(new Date()),
      total: latestSnapshots.docs[0].data().total - value,
      uid: userInfo.uid,
      uname: userInfo.name,
    });
  }
};
