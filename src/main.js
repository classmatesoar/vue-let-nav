// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import router from './router';
import element_ui from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
import $ from 'jquery';
import { basePath } from "../static/config";
import { setTimeout } from 'timers';
import store from './vuex/store'

Vue.prototype.$axios = axios;
Vue.prototype.$ = $;
Vue.prototype.$basePath = basePath;
Vue.use(Vuex);
Vue.use(element_ui);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  // components: { App },
  // template: '<App/>',
  render: h => h(App),
  computed: {
  },
  mounted() {

  },
  watch: {
    '$route'(to, from, next) {
      const appName = "练习项目-";
      if (to.meta.title) {
        document.title = appName + to.meta.title
      } else {
        document.title = `${appName}路由`
      }
    }
  }
})
