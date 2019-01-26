import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faLock,
  faSignOutAlt,
  faCog,
  faShieldAlt,
  faPlus,
  faCreditCard,
  faWallet,
  faPercent,
  faBookOpen,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faFile
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ASpinner from './components/shared/ASpinner.vue'
library.add(
  faEnvelope,
  faLock,
  faSignOutAlt,
  faCog,
  faShieldAlt,
  faPlus,
  faCreditCard,
  faWallet,
  faPercent,
  faBookOpen,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faFile
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('spinner', ASpinner)

Vue.mixin({
  methods: {
    separateThousands(amount) {
      const fixedAmount = (+amount / 100).toFixed(2);
      return fixedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    getCurrencySymbol(name) {
      const list = {
        "EUR": "€",
        "USD": "$",
        "GBP": "£",
        "RUB": "₽"
      };
      return list[name] ? list[name] : name;
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
