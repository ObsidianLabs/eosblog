import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'iview/dist/styles/iview.css';
import post from '@/lib/post';
import auth from '@/lib/auth';

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$auth = auth;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
