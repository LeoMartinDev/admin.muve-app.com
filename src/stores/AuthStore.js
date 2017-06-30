import Vue from 'vue';
import Vuex from 'vuex';
import LocalStorage from '@/services/LocalStorage';
import Axios from '@/services/Axios';
import * as ls from 'store';

Vue.use(Vuex);

const state = {
  isAuthenticated: !!ls.get('localforage/token'),
};

const actions = {
  signIn({commit, state}, data) {
    return Axios.post('/signin', data)
      .then(res => {
        console.log('COMMIT LOGIN_SUCCESS');
        return LocalStorage.setItem('token', res.data.token);
      })
      .then(() => commit('LOGIN_SUCCESS'));
  },
  signOut({commit, state}) {
    console.log('COMMIT LOGOUT');
    return LocalStorage.removeItem('token')
      .then(() => commit('LOGOUT'));
  },
};

const mutations = {
  LOGIN_SUCCESS(state) {
    console.log('MUTATION LOGIN_SUCCESS');
    Vue.set(state, 'isAuthenticated', true);
  },
  LOGOUT(state) {
    console.log('MUTATION LOGOUT');
    Vue.set(state, 'isAuthenticated', false);
  },
};

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated
  },
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  strict: true,
});

export default store;
