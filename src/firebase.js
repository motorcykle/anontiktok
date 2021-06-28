import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };

export default db;