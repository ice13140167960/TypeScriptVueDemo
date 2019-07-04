import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {baseUrl,imageUrl,commonUtils,$http} from './utils/util'

Vue.config.productionTip = false;
Vue.prototype.$baseUrl=baseUrl;
Vue.prototype.$imageUrl=imageUrl;
Vue.prototype.$commonUtils=commonUtils;
Vue.prototype.$http=$http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
