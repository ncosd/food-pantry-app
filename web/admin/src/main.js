import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator, getIdTokenResult } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { useAuthUserStore } from '@/stores/authUser'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'


fetch('/__/firebase/init.json').then(async response => {
  await response
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
  if (import.meta.env.VITE_RUN_LOCAL === 'true' && window.location.hostname == "localhost") {
    console.log('localhost detected, using emulator localhost:8080 and function emulator 5001')
    connectFirestoreEmulator(db, 'localhost', 8080);

    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099")
    const functions = getFunctions(firebaseApp)
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }

  getAuth().onAuthStateChanged(async user => {
    let isAdmin = false
    let isVolunteer = false
    let isPending = false
    if (user) {
      const token = await getIdTokenResult(user)
      isAdmin = token.claims.admin === true
      isVolunteer = token.claims.volunteer === true
      isPending = token.claims.pendingvolunteer === true
    }
    useAuthUserStore().save(user, isAdmin, isVolunteer, isPending)
  });

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
})
