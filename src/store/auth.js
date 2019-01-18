const state = {
  errors: null,
  user: {},
  isAuthenticated: false
  // isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  login({ commit }, credentials) {
    return new Promise(resolve => {
      const user = {
        first_name: 'Sergey',
        last_name: 'Kucherenko'
      };
      commit('setAuth', user);
      resolve();
      // ApiService.post("users/login", { user: credentials })
      //   .then(({ data }) => {
      //     context.commit(SET_AUTH, data.user);
      //     resolve(data);
      //   })
      //   .catch(({ response }) => {
      //     context.commit(SET_ERROR, response.data.errors);
      //   });
    });
  },
  logout({ commit }) {
    commit(PURGE_AUTH);
  },
  checkAuth({ commit }) {
    // if (JwtService.getToken()) {
    ApiService.setHeader();
    ApiService.get("user")
      .then(({ data }) => {
        commit(SET_AUTH, data.user);
      })
      .catch(({ response }) => {
        commit(SET_ERROR, response.data.errors);
      });
    // } else {
    //   context.commit(PURGE_AUTH);
    // }
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
  setAuth(state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    // JwtService.saveToken(state.user.token);
  },
  purgeAuth(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    // JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};