<template></template>

<script>
  import AuthStore from '@/stores/AuthStore';
  import {mapActions} from 'vuex';

  export default {
    store: AuthStore,
    created() {
      console.log('::::::::: LOGOUT ::::::::::');
      this.signOut()
        .then(console.log('Logout'))
        .then(() => this.$router.push({ name: 'login' }))
    },
    methods: {
      ...mapActions(['signOut']),
    },
  }
</script>
