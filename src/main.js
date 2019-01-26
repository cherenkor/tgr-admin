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
    addSpaces(numbers, hasDesimal) {
      let decimals = "";
      if (hasDesimal) {
        decimals = numbers.slice(-3);
        numbers = numbers.slice(0, -3);
      }

      numbers = numbers
        .split("")
        .reverse()
        .map((num, i) => {
          if (num === "-" || i === 0) return num;
          num += i % 3 === 0 ? " " : "";
          return num;
        })
        .reverse()
        .join("");

      return numbers + decimals;
    },
    separateThousands(amount) {
      const amountString = amount.toString();
      const hasDesimal = +amount % 1 != 0;

      return this.addSpaces(amountString, hasDesimal);
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
