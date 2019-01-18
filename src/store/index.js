import Vue from 'vue'
import Vuex from 'vuex'

import profile from './auth'
import cards from './cards'
import wallets from './wallets'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        profile: {
            namespaced: true,
            ...profile
        },
        cards: {
            namespaced: true,
            ...cards
        },
        wallets: {
            namespaced: true,
            ...wallets
        },
        auth: {
            namespaced: true,
            ...auth
        }
    }
})
