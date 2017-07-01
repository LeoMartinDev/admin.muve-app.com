import Vue from 'vue';
import Vuex from 'vuex';
import Axios from '@/services/Axios';
import AuthStore from '@/stores/AuthStore';
import LocalStorage from '@/services/LocalStorage';

Vue.use(Vuex);

const state = {
  users: [],
  error: {},
};

const actions = {
  getUsers({ commit }) {
    return LocalStorage.getItem('token')
      .then(token => Axios.get('/users', { headers: { token }}))
      .then(response => {
        commit('SET_USERS', response.data);
      });
  },
  createUser({ commit, state }, user) {
    return LocalStorage.getItem('token')
      .then(token => Axios.post('/users', user, {headers: {token}}))
      .then(response => {
        let userDoc = response.data;
        let isAlreadySaved = typeof state.users.find(item => String(item.id) === String(userDoc.id)) !== 'undefined';
        if (!isAlreadySaved) commit('CREATE_USER', userDoc);
      })
  },
  updateUser({ commit, state }, { id, user }) {
    console.log('updateUser : user ::: ', user);
    return LocalStorage.getItem('token')
      .then(token => Axios.put(`/users/${id}`, user, { headers: { token }}))
      .then(response => {
        console.log('updateUser ::: ', response.data);
        commit('UPDATE_USER', response.data);
      });
  },
  destroyUser({ commit, state }, user) {
    console.log('destroyUser ::: ', user)
    return LocalStorage.getItem('token')
      .then(token => Axios.delete(`/users/${user.id}`, { headers: { token }}))
      .then(() => commit('DESTROY_USER', user));
  },
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  CREATE_USER(state, user) {
    state.users.unshift(user);
  },
  UPDATE_USER(state, user) {
    let index = state.users.findIndex(item => String(item.id) === String(user.id));
    console.log('UPDATE_USER ::: ', state.users[index]);
    Object.assign(state.users[index], user);
    console.log('Updated user ::: ', state.users[index]);
  },
  DESTROY_USER(state, user) {
    let index = state.users.findIndex(item => String(item.id) === String(user.id));
    state.users.splice(index, 1);
  },
};

const getters = {
  isEmpty({ users }) {
    return users.length === 0;
  },
  currentUser({ route, users }) {
    return route.params && route.params.id ? users.find(item => String(item.id) === String(route.params.id)) : undefined;
  },
  currentUserUpdatable({ route, users}, { currentUser }) {
    if (route.params && route.params.id) {
      const { email, firstName, lastName } = currentUser;
      return { email, firstName, lastName };
    }
    return undefined;
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
