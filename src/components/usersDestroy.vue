<template>
  <b-modal id="modal1" title="Are you sure ?" @hidden="onHidden" @cancel="onCancel" @ok="onOk" :visible="true">
    <pre>{{ user }}</pre>
    <template slot="modal-footer">
      <b-btn @click.prevent="onCancel">Cancel</b-btn>
      <b-btn @click.prevent="onOk" variant="danger"><icon name="trash"></icon></b-btn>
    </template>
  </b-modal>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import UsersStore from '@/stores/UsersStore';

  export default {
    name: 'usersDestroy',
    store: UsersStore,
    methods: {
      ...mapActions([
        'destroyUser',
      ]),
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
        console.log('onOk : currentUser ::: ', this.user);
        this.destroyUser(this.user)
          .then(() => this.close())
          .catch(console.error);
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
