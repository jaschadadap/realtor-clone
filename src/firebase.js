// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDywKehPw7FAdvZc-4fmPzKWdNLnZ9AqA",
  authDomain: "realtor-clone-react-b791f.firebaseapp.com",
  projectId: "realtor-clone-react-b791f",
  storageBucket: "realtor-clone-react-b791f.appspot.com",
  messagingSenderId: "573665743614",
  appId: "1:573665743614:web:96a75a4a16f477afaa8baf"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()