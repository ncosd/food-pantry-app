import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/functions';
import { useAuthUserStore } from '@/stores/authUser';

import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
//import * as colorModes from '@/color-modes.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

fetch('/__/firebase/init.json').then(async response => {
  await response;
  if (response.ok) {
    const config = await response.json()
    console.log('response.json='+ JSON.stringify(config))
    firebase.initializeApp(config)
    firebase.analytics()
  } else {
    console.log("firebase/init.json response not ok, have you started the firebase server locally?")
    firebase.initializeApp({
      apiKey: import.meta.env.VITE_FB_APIKEY,
      authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
      projectId: import.meta.env.VITE_FB_PROJECTID,
      storageBucket: import.meta.env.VITE_FB_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FB_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FB_APPID,
      measurementId: import.meta.env.VITE_FB_MEASUREMENTID
    })
  }

  const db = firebase.firestore()
  if (window.location.hostname == "localhost") {
    console.log('localhost detected, using emulator localhost:8080')
    db.settings({
      host: 'localhost:8080',
      ssl: false
    })
    firebase.auth().useEmulator('http://localhost:9099/')
    firebase.functions().useFunctionsEmulator("http://localhost:5001")
  }

  firebase.auth().onAuthStateChanged(user => {
    console.log('main.js onAuthStateChanged user='+ JSON.stringify(user))
    useAuthUserStore().save(user)
  });


  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')

  // Vue.prototype.$analytics = firebase.analytics();
})
