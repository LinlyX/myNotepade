import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/index'
import VueToast from 'vue2-toast'
import Tabs from './components/tabs'
import Notification from './components/notification'
import 'vue2-toast/lib/toast.css'
Vue.use(VueToast, {
  defaultType: 'center'
})
Vue.use(Tabs)
Vue.use(Notification)
Vue.use(Vuex)
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
