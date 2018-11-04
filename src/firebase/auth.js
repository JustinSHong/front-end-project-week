// interface between Firebase and this React app
import { auth } from "./firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Log In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Log In with Google
export const doSignInWithPopup = provider => auth.signInWithPopup(provider);
