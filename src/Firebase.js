import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCXk43pU314vGetfhsdgm8KiEx-cepSA2w",
  authDomain: "disney-clone-0015.firebaseapp.com",
  projectId: "disney-clone-0015",
  storageBucket: "disney-clone-0015.appspot.com",
  messagingSenderId: "1088068229780",
  appId: "1:1088068229780:web:f08064fbf7cc1acf033281"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
