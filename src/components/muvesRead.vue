<template>
  <b-modal id="modal1" title="Read an user" @hidden="onHidden" @cancel="onCancel" @ok="onOk" :visible="true">
    <spinner v-show="typeof muve === 'undefined'"></spinner>
    <pre v-show="typeof muve !== 'undefined'">{{ muve }}</pre>
    <template slot="modal-footer">
      <b-btn @click.prevent="onCancel">Close</b-btn>
      <b-btn @click.prevent="onOk" :to="{ name: 'muves.update', params: { id: $route.params.id }}" variant="primary">Edit</b-btn>
    </template>
  </b-modal>
</template>

<script>
  import Axios from '@/services/Axios';
  import {required, email, between, minLength} from 'vuelidate/lib/validators'
  import Spinner from 'vue-simple-spinner';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import MuvesStore from '@/stores/MuvesStore';

  export default {
    name: 'muvesRead',
    components: {Spinner},
    store: MuvesStore,
    methods: {
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
        this.close();
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
