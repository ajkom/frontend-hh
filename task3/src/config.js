import firebase from 'firebase';
//   Change you firebase settings here

const firebaseConfig= {
    apiKey: "AIzaSyA5dbAZxMDOkfUrCSM86E1a9HLcjX6nUno",
    authDomain: "personal-trainer-ab00a.firebaseapp.com",
    databaseURL: "https://personal-trainer-ab00a.firebaseio.com",
    projectId: "personal-trainer-ab00a",
    storageBucket: "personal-trainer-ab00a.appspot.com",
    messagingSenderId: "188125312391"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
export const db = firebase.database();
