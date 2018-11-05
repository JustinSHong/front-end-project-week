// interface between Firebase and this React app
import { auth } from "./firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Log In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Log In with Google
export const doSignInWithGmail = provider => auth.signInWithPopup(provider);

// Log In with Facebook
export const doSignInWithFacebook = provider => auth.signInWithPopup(provider);

// Log In with Twitter
export const doSignInWithTwitter = provider => auth.signInWithPopup(provider);

// Log In with Github
export const doSignInWithGithub = provider => auth.signInWithPopup(provider);

// Sign out
export const doSignOut = () => {
    auth.signOut();
};
