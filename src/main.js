import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

import { store } from './store/store';
import { router } from './router/router';

Vue.use(VueResource);

Vue.http.options.root = 'https://vue-stock-trader-6617f.firebaseio.com/';

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
