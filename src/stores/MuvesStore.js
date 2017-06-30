import Vue from 'vue';
import Vuex from 'vuex';
import Axios from '@/services/Axios';
import AuthStore from '@/stores/AuthStore';
import LocalStorage from '@/services/LocalStorage';

Vue.use(Vuex);

const state = {
  muves: [],
  error: {},
};

const actions = {
  getMuves({commit}) {
    return LocalStorage.getItem('token')
      .then(token => Axios.get('/muves', {headers: {token}}))
      .then(response => {
        commit('SET_MUVES', response.data);
      });
  },
  createMuve({commit, state}, muve) {
    return LocalStorage.getItem('token')
      .then(token => Axios.post('/muves', muve, {headers: {token}}))
      .then(response => {
        let muveDoc = response.data;
        let isAlreadySaved = typeof state.muves.find(item => String(item.id) === String(muveDoc.id)) !== 'undefined';
        if (!isAlreadySaved) commit('CREATE_MUVE', muveDoc);
      })
  },
  updateMuve({commit, state}, {id, muve}) {
    console.log('updateMuve : muve ::: ', muve);
    return LocalStorage.getItem('token')
      .then(token => Axios.put(`/muves/${id}`, muve, {headers: {token}}))
      .then(response => {
        console.log('updateMuve ::: ', response.data);
        commit('UPDATE_MUVE', response.data);
      });
  },
  destroyMuve({commit, state}, muve) {
    console.log('destroyMuve ::: ', muve);
    return LocalStorage.getItem('token')
      .then(token => Axios.delete(`/muves/${muve.id}`, {headers: {token}}))
      .then(() => commit('DESTROY_MUVE', muve));
  },
};

const mutations = {
  SET_MUVES(state, muves) {
    state.muves = muves;
  },
  CREATE_MUVE(state, muve) {
    state.muves.unshift(muve);
  },
  UPDATE_MUVE(state, muve) {
    let index = state.muves.findIndex(item => String(item.id) === String(muve.id));
    console.log('UPDATE_MUVE ::: ', state.muves[index]);
    Object.assign(state.muves[index], muve);
    console.log('Updated muve ::: ', state.muves[index]);
  },
  DESTROY_MUVE(state, muve) {
    let index = state.muves.findIndex(item => String(item.id) === String(muve.id));
    state.muves.splice(index, 1);
  },
};

const getters = {
  isEmpty({muves}) {
    return muves.length === 0;
  },
  currentMuve({route, muves}) {
    return route.params && route.params.id ? muves.find(item => String(item.id) === String(route.params.id)) : undefined;
  },
  currentMuveUpdatable({route, muves}, {currentMuve}) {
    if (route.params && route.params.id) {
      const {author, content} = currentMuve;
      return {author: author.id, content};
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
