import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faSignOutAlt, faCog, faShieldAlt, faPlus, faCreditCard, faWallet, faPercent, faBookOpen, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope, faLock, faSignOutAlt, faCog, faShieldAlt, faPlus, faCreditCard, faWallet, faPercent, faBookOpen, faArrowAltCircleUp, faArrowAltCircleDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
