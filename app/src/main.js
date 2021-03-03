import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import router from './router'
import firebase from 'firebase/app';
import 'firebase/analytics';
import store from "./store";


fetch('/__/firebase/init.json').then(async response => {
  const config = await response.json();
  console.log('response.json='+ JSON.stringify(config));
  firebase.initializeApp(config);
  firebase.analytics();


  const db = firebase.firestore();
  if (window.location.hostname == "localhost") {
    console.log('localhost detected, using emulator localhost:8080');
    db.settings({
      host: 'localhost:8080',
      ssl: false
    });
    firebase.auth().useEmulator('http://localhost:9099/');
  }

  firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
  });


  Vue.config.productionTip = false

  // alias
  Vue.prototype.$analytics = firebase.analytics();

  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});
