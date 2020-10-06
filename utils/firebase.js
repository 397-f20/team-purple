import * as firebase from 'firebase';
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyB-H0P6DAatoZcvJyXp2Prqmj1fHSiA4U0",
  authDomain: "tiebreaker-bf372.firebaseapp.com",
  databaseURL: "https://tiebreaker-bf372.firebaseio.com",
  projectId: "tiebreaker-bf372",
  storageBucket: "tiebreaker-bf372.appspot.com",
  messagingSenderId: "13407063646",
  appId: "1:13407063646:web:eb1714487193126a9eaecf",
  measurementId: "G-QFL3Y9PF3G"
};
firebase.initializeApp(firebaseConfig);
export {
  firebase
};