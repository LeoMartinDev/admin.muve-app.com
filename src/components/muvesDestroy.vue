<template>
  <b-modal id="modal1" title="Are you sure ?" @hidden="onHidden" @cancel="onCancel" @ok="onOk" :visible="true">
    <pre>{{ muve }}</pre>
    <template slot="modal-footer">
      <b-btn @click.prevent="onCancel">Cancel</b-btn>
      <b-btn @click.prevent="onOk" variant="danger"><icon name="trash"></icon></b-btn>
    </template>
  </b-modal>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import MuvesStore from '@/stores/MuvesStore';

  export default {
    name: 'usersDestroy',
    store: MuvesStore,
    methods: {
      ...mapActions([
        'destroyMuve',
      ]),
      close() {
        this.$router.push({ name: 'muves' });
      },
      onCancel() {
        this.close();
      },
      onHidden() {
        this.close();
      },
      onOk() {
        console.log('onOk : currentMuve ::: ', this.muve);
        this.destroyMuve(this.muve)
          .then(() => this.close())
          .catch(console.error);
      },
    },
    computed: {
      ...mapGetters({
        muve: 'currentMuve',
      }),
    },
  };
</script>

<style lang="scss">

</style>
