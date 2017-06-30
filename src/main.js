import Vue from 'vue';
import App from './App';
import BootstrapVue from 'bootstrap-vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import Vuelidate from 'vuelidate'
import {sync} from 'vuex-router-sync';
import {instance} from '@/router';
import UsersStore from '@/stores/UsersStore';
import MuvesStore from '@/stores/MuvesStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

global.Promise = window.Promise = require('bluebird');

sync(UsersStore, instance);
sync(MuvesStore, instance);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component('icon', Icon);
Vue.use(Vuelidate);

new Vue({
  el: '#app',
  router: instance,
  template: '<App/>',
  components: {App},
});
