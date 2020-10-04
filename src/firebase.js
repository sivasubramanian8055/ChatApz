import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDsf9KtvsoQoZfq3kqxVd_-Wr-x-UOv4Bo",
  authDomain: "chat-app-27fd1.firebaseapp.com",
  databaseURL: "https://chat-app-27fd1.firebaseio.com",
  projectId: "chat-app-27fd1",
  storageBucket: "chat-app-27fd1.appspot.com",
  messagingSenderId: "612710648832",
  appId: "1:612710648832:web:b11d8b75d50a7554c81ce5",
  measurementId: "G-6BK3Y0BG4L"
};
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db= firebase.firestore();
export default firebase;
