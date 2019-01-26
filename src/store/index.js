import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import profile from './auth'
import cards from './cards'
import wallets from './wallets'
import auth from './auth'

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        window.location = '/';
    }
});

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
