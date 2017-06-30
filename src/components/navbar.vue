<template>
  <b-navbar toggleable type="inverse" variant="success">
      <b-nav is-nav-bar>
        <b-nav-item v-for="item in filteredItems" :to="{ name: item.name }" activeClass="active" exact>{{ item.name }}</b-nav-item>
      </b-nav>
  </b-navbar>
</template>

<script>
  import { routes } from '../router';
  import AuthStore from '@/stores/AuthStore';
  import {mapGetters} from 'vuex';

  export default {
    name: 'navbar',
    store: AuthStore,
    props: {
      brand: String,
    },
    data() {
      return {
        menuItems: routes,
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
      authenticatedMenu() {
        return this.menuItems.filter(item => item.meta && item.meta.requireAuth);
      },
      guestMenu() {
        return this.menuItems.filter(item => !item.meta || !item.meta.requireAuth);
      },
      filteredItems() {
        return this.isAuthenticated ? this.authenticatedMenu : this.guestMenu;
      },
    },
  };
</script>

<style lang="scss">

</style>
