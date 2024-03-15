// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNd4rxUttfG6a-CNPF4FqzaZEMIA8Up2c",
    authDomain: "receitaboaa.firebaseapp.com",
    projectId: "receitaboaa",
    storageBucket: "receitaboaa.appspot.com",
    messagingSenderId: "553086552531",
    appId: "1:553086552531:web:8bfe0a35aa3098239e0726",
    measurementId: "G-LDKH8JPSGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;