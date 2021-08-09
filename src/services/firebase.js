import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDzvLUfEdAx33AjldlsxwXw3zkp6F5GXrc",
    authDomain: "carritodecompras-deb85.firebaseapp.com",
    projectId: "carritodecompras-deb85",
    storageBucket: "carritodecompras-deb85.appspot.com",
    messagingSenderId: "659693761846",
    appId: "1:659693761846:web:685194857d403438706f97"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();

export { db, auth, storage };