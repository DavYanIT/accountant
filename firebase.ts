import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAFVBD3kicjIJv0oUS8IyQXmQzhDU7DzR8',

  authDomain: 'spendings-3d544.firebaseapp.com',
  databaseURL: 'https://spendings-3d544.firebaseio.com',
  projectId: 'spendings-3d544',
  storageBucket: 'spendings-3d544.appspot.com',

//   messagingSenderId: 'sender-id',
  appId: '1:472039429404:android:3483d53078e67f3204d6d9',
//   measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);
