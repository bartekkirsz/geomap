import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
  apiKey: "",
    authDomain: "geomap-deb38.firebaseapp.com",
    databaseURL: "https://geomap-deb38.firebaseio.com",
    projectId: "geomap-deb38",
    storageBucket: "geomap-deb38.appspot.com",
    messagingSenderId: "531595922585",
    appId: "1:531595922585:web:14b4408aaeea80882a7c08",
    measurementId: "G-4ZJBB01669"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}