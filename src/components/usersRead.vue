<template>
  <b-modal id="modal1" title="Read an user" @hidden="onHidden" @cancel="onCancel" @ok="onOk" :visible="true">
    <spinner v-show="typeof user === 'undefined'"></spinner>
    <pre v-show="typeof user !== 'undefined'">{{ user }}</pre>
    <template slot="modal-footer">
      <b-btn @click.prevent="onCancel">Close</b-btn>
      <b-btn @click.prevent="onOk" :to="{ name: 'users.update', params: { id: $route.params.id }}" variant="primary">Edit</b-btn>
    </template>
  </b-modal>
</template>

<script>
  import Axios from '@/services/Axios';
  import {required, email, between, minLength} from 'vuelidate/lib/validators'
  import Spinner from 'vue-simple-spinner';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import UsersStore from '@/stores/UsersStore';

  export default {
    name: 'usersRead',
    components: {Spinner},
    store: UsersStore,
    created() {
/*      if (typeof this.$store.currentUser === 'undefined')
        setTimeout(() => {
          if (typeof this.$store.currentUser !== 'undefined') {
            console.log(this.$store.currentUser)
            return this.user = this.$store.currentUser;
          }
          Axios.get(`/users/${this.$route.params.id}`)
            .then(response => {
              console.log(response)
              this.user = response.data
            })
            .catch(console.error);
        }, 3000);*/
    },
    methods: {
      close() {
        this.$router.push({ name: 'users' });
      },
      onCancel() {
        this.close();
      },
      onHidden() {
        this.close();
      },
      onOk() {
        this.close();
      },
    },
    computed: {
      ...mapGetters({
        user: 'currentUser',
      }),
    },
  };
</script>

<style lang="scss">

</style>
