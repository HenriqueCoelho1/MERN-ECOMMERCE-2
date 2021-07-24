import firebase from "firebase/app"
import "firebase/auth"
// firebase config
const config = {
    apiKey: "AIzaSyD22MYJLlPARtbPc6c8GnJUFpv9W02RVJ8",
    authDomain: "ecommerce-mern-d67e1.firebaseapp.com",
    projectId: "ecommerce-mern-d67e1",
    storageBucket: "ecommerce-mern-d67e1.appspot.com",
    messagingSenderId: "903826351331",
    appId: "1:903826351331:web:08ddcffd4c2483bb7dd1d6"
}

// initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

// export
// export default firebase
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()