import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBc8yFl_6XtAiycw-xNhZaEkne1g1o3Tbc",
    authDomain: "whatsapp-chat-12162.firebaseapp.com",
    databaseURL: "https://whatsapp-chat-12162.firebaseio.com",
    projectId: "whatsapp-chat-12162",
    storageBucket: "whatsapp-chat-12162.appspot.com",
    messagingSenderId: "463932004658",
    appId: "1:463932004658:web:3bb438cd7f609fb49b1f2b",
    measurementId: "G-KHYS3GTV19"
  };

  const firebaseApp = firebase.initializeApp
  (firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;