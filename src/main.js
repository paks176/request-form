// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/assets/styles/styles.css'

// elements
import Vue from 'vue'
import App from './App.vue'
import store from '@/store';
import router from '@/router/index';

// plugins
import BytesToBase64 from '@/plugins/bytesToBase64';
import Base64ToBytes from '@/plugins/base64ToBytes';

Vue.use(BytesToBase64);
Vue.use(Base64ToBytes);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
