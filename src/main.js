import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
import InfiniteLoading from 'vue-infinite-loading';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  InfiniteLoading,
  render: (h) => h(App),
}).$mount('#app');
