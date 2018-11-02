// interface between Firebase and this React app
import { auth } from "./firebase";

// Sign Up
auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
