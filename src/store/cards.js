import axios from 'axios'
import config from '../config/index.js'
const { baseURL } = config;
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const state = {
  cards: [],
  transactions: []
};

const getters = {};

const actions = {
  loadCards({ commit }) {
    return axios.get(baseURL + '/api/client/cards').then(res => {

      const cards = res.data.cards.filter(card => card.status === 1);
      commit('setCards', cards);
      return cards;
    })
      .catch(console.log);
  },
  loadCardTransactions({ commit }, { id, page }) {
    return axios.get(`${baseURL}/api/client/cards/${id}/transactions?page=${page}&page_limit=20`).then(res => {

      commit('setCardTransactions', res.data.transactions);
      return res.data.transactions;
    })
      .catch(console.log);
  },
  loadPin(context, id) {
    return axios.get(`${baseURL}/api/client/cards/${id}/get_pin`).then(res => {
      return res.data.pin;
    })
      .catch(console.log);
  },
  sendRequest(context, id) {
    const data = { "online_purchase": true };
    return axios.post(`${baseURL}/api/client/cards/${id}/settings`, data).then(res => {
      return true;
    })
      .catch(console.log);
  }
};

const mutations = {
  setCards(state, cards) {
    state.cards = cards;
  },
  setCardTransactions(state, transactions) {
    state.transactions = [...state.transactions, transactions];
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};