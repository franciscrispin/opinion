import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyB0e-vZUekN1zSMn-b9_51IEs8kmPnPhEs',
  authDomain: 'opinion-fb623.firebaseapp.com',
  databaseURL: 'https://opinion-fb623.firebaseio.com',
  projectId: 'opinion-fb623',
  storageBucket: 'opinion-fb623.appspot.com',
  messagingSenderId: '68098896855',
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
