import firebaseConfig from './config';

const { firebase } = global;

if (firebase && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase && firebase.firestore();
const storage = firebase && firebase.storage();

export { firestore, storage };
