// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from "firebase/app";
import "firebase/auth";
// firebase config

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyDHHg1bzgckRR_TvpEECJcH8Z_VoU_a0G8",
    authDomain: "ecommerce-e06d6.firebaseapp.com",
    projectId: "ecommerce-e06d6",
    storageBucket: "ecommerce-e06d6.appspot.com",
    messagingSenderId: "288408302531",
    appId: "1:288408302531:web:2af6ebe9cebd60350ac376"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
// Initialize Firebase
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
