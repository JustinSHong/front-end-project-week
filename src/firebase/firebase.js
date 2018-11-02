import firebase from "firebase/app";
import "firebase/auth";

// firebas config for this project
const config = {
    apiKey: "AIzaSyDHoAuJr831RmIBzdCUPN4VqNuNbcclGtw",
    authDomain: "lambdanotes-9e838.firebaseapp.com",
    databaseURL: "https://lambdanotes-9e838.firebaseio.com",
    projectId: "lambdanotes-9e838",
    storageBucket: "lambdanotes-9e838.appspot.com",
    messagingSenderId: "700108320647"
};

// initialize firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// initialize auth object
const auth = firebase.auth();

export { auth };
