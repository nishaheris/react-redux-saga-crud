// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyTKdn_nvf39iGuGj8MAiBpFRZSEsFvHw",
  authDomain: "react-redux-crud-4b10e.firebaseapp.com",
  projectId: "react-redux-crud-4b10e",
  storageBucket: "react-redux-crud-4b10e.appspot.com",
  messagingSenderId: "1065024647449",
  appId: "1:1065024647449:web:5999ba2dddc81a7ca09588",
  measurementId: "G-CRR1EBYS7R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
