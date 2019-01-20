import axios from 'axios'
import config from '../config/index.js'
const { baseURL } = config;

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated || localStorage.getItem('token');
  }
};

const actions = {
  login({ commit }, credentials) {
    return axios.post(baseURL + '/api/client/auth/login', credentials).then(res => {
      commit('setAuth', res.data);
      return res.data;
    })
      .catch(console.log);
  },
  logout({ commit }) {
    return axios.post(baseURL + '/api/client/auth/logout').then(res => {
      commit('purgeAuth');
      return res;
    })
      .catch(console.log);
  },
  checkAuth({ commit }) {

  },
  updateUser({ commit }, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      commit(SET_AUTH, data.user);
      return data;
    });
  }
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setAuth(state, { token, user }) {
    state.isAuthenticated = true;
    state.user = user;
    const name = `${user.title}. ${user.first_name} ${user.last_name}`;
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  purgeAuth(state) {
    state.isAuthenticated = false;
    state.user = {};
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};