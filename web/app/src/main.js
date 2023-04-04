import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { useAuthUserStore } from '@/stores/authUser'
// TODO: this is a workaround for the vite-sass compiler issue
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/scss/styles.scss'
import * as bootstrap from 'bootstrap'
//import * as colorModes from '@/color-modes.js'


fetch('/__/firebase/init.json').then(async response => {
  await response;
  var firebaseApp
  if (response.ok) {
    const config = await response.json()
    firebaseApp = initializeApp(config)
    getAnalytics(firebaseApp)
  } else {
    console.log("firebase/init.json response not ok, have you started the firebase server locally?")
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_FB_APIKEY,
      authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
      projectId: import.meta.env.VITE_FB_PROJECTID,
      storageBucket: import.meta.env.VITE_FB_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FB_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FB_APPID,
      measurementId: import.meta.env.VITE_FB_MEASUREMENTID
    })
  }

  const db = getFirestore(firebaseApp)
  if (window.location.hostname == "localhost") {
    console.log('localhost detected, using emulator localhost:8080 and function emulator 5001')
    connectFirestoreEmulator(db, 'localhost', 8080);

    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099")
    const functions = getFunctions(firebaseApp)
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }


  getAuth().onAuthStateChanged(user => {
    useAuthUserStore().save(user)
  });

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')

})
