// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Datetime from 'vue-datetime'
import VCalendar from 'v-calendar'
import 'vuetify/dist/vuetify.min.css'
import 'vue-datetime/dist/vue-datetime.css'
import 'v-calendar/lib/v-calendar.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#26A69A', // teal lighten 1
    secondary: '#0277BD', // light blue darken 3
    accent: '#7CB342', // light green darken 1
    error: '#F44336' // red
  }
})
Vue.use(Datetime)
Vue.use(VCalendar, {
  firstDayOfWeek: 2 // Monday
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
