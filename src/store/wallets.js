import axios from 'axios'
import config from '../config/index.js'
const { baseURL } = config;
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const state = {
  wallets: [],
  transactions: []
};

const getters = {};

const actions = {
  loadWallets({ commit }) {
    return axios.get(baseURL + '/api/client/wallets').then(res => {
      commit('setWallets', res.data.wallets);
      return res.data.wallets;
    })
      .catch(console.log);
  },
  loadWalletTransactions({ commit }, { id, page }) {
    return axios.get(`${baseURL}/api/client/wallets/${id}/transactions?page=${page}&page_limit=20`).then(res => {

      commit('setWalletTransactions', res.data.transactions);
      return res.data.transactions;
    })
      .catch(console.log);
  }
};

const mutations = {
  setWallets(state, wallets) {
    state.wallets = wallets;
  },
  setWalletTransactions(state, transactions) {
    state.transactions = [...state.transactions, transactions];
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};