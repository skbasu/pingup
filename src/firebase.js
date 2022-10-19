import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDqlg_ij6JClfx2_cnq3765SeVaXqxg36Q",
    authDomain: "pingup-edf59.firebaseapp.com",
    projectId: "pingup-edf59",
    storageBucket: "pingup-edf59.appspot.com",
    messagingSenderId: "539421697753",
    appId: "1:539421697753:web:5cf4834c277105894240c8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;