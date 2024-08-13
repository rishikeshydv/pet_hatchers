import React from 'react'
import { app } from '../config'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(app);
export default async function Signup(email: string, password: string) {


  createUserWithEmailAndPassword(auth, email, password).then
  (userCredential => {
    // Signed in
    })
    .catch((error) => {
      console.log(error);
    });
} 
  