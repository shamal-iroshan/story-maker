import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyACEl41IaE016PMAYVY62d6B8kRD6bPJ6E",
    authDomain: "story-maker-74937.firebaseapp.com",
    projectId: "story-maker-74937",
    storageBucket: "story-maker-74937.appspot.com",
    messagingSenderId: "717731149247",
    appId: "1:717731149247:web:f55d039740256769509d0a"
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();

export default fireStore;