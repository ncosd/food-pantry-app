import Vue from 'vue';
//import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { Vuetify, VApp, VForm } from 'vuetify/lib';

// //import 'vuetify/src/stylus/app.styl';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.component('v-app', VApp)
Vue.component('v-form', VForm)

// const req = require.context('../../src/stories', true, /.stories.js$/)

// function loadStories () {
//   req.keys().forEach(filename => req(filename))
// }

// configure(loadStories, module)
// }


export default new Vuetify({
});
