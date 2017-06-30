<template>

  <div class="offset-3 col-6">
    <b-card header="Login"
            show-footer
    >
      <b-form-fieldset label="Name" :label-size="1">
        <b-form-input v-model.trim="form.name" type="text"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset label="Password" :label-size="1">
        <b-form-input v-model.trim="form.password" type="password"></b-form-input>
      </b-form-fieldset>
      <small slot="footer" class="text-muted">
        <b-btn @click.prevent="login">Login</b-btn>
      </small>
    </b-card>
  </div>

</template>

<script>
  import Axios from '@/services/Axios';
  import AuthStore from '@/stores/AuthStore';
  import {mapState, mapActions} from 'vuex';

  export default {
    store: AuthStore,
    data() {
      return {
        form: {
          name: '',
          password: '',
        },
      };
    },
    methods: {
      ...mapActions(['signIn']),
      login() {
        this
          .signIn(this.form)
          .then(() => this.$router.push('/muves'))
          .catch(() => {
            this.form.name = '';
            this.form.password = '';
          });
      },
    }
  }
</script>
