// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router/router.js'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
