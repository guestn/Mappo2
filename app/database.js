import firebase from 'firebase';
import config from './firebaseConfig';

console.log(config)

firebase.initializeApp(config);
const database = firebase.database();

export default database;