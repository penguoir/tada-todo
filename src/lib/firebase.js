import React from 'react'
import firebase from 'firebase'
import FirebaseAuth from 'react-firebaseui/FirebaseAuth'

firebase.initializeApp({
  apiKey: "AIzaSyBC4HdP8DHk_Qkkb9f7NPfwqqKWRSOgQBY",
  authDomain: "tadatodo-e51ad.firebaseapp.com",
  databaseURL: "https://tadatodo-e51ad.firebaseio.com",
  projectId: "tadatodo-e51ad",
  storageBucket: "tadatodo-e51ad.appspot.com",
  messagingSenderId: "195844346703"
})

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  callbacks: {
    signInSuccess: function (authResult) {
      require('js-cookie').set('userid', authResult.uid)
      return true
    }
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
}

var firestore = firebase.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

function JoinButton() {
  return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
}

export {
  firestore,
  firebase,
  JoinButton
}