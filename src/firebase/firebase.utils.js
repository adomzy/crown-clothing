import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAzbWQNICuqR4RdTBFksGSwJwKF-5dUsYo",
    authDomain: "crown-clothing-c22d3.firebaseapp.com",
    databaseURL: "https://crown-clothing-c22d3.firebaseio.com",
    projectId: "crown-clothing-c22d3",
    storageBucket: "crown-clothing-c22d3.appspot.com",
    messagingSenderId: "979027006171",
    appId: "1:979027006171:web:2e5fc6129f26a1fdadb2fe",
    measurementId: "G-7VHM4Z3BLV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
