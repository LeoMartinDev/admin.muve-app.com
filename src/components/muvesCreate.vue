<template>
  <b-modal id="muvesCreate" title="Create a muve" @hidden="onHidden" @cancel="onCancel" @ok="onOk" :visible="true">
    <b-form-fieldset label="Author"
                     :state="$v.form.author.$invalid ? 'warning' : 'success'"
                     :label-size="1">
      <b-form-input v-model.trim="form.author" type="text"></b-form-input>
      <small v-if="!$v.form.author.required" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        Field is required
      </small>
    </b-form-fieldset>

    <b-form-fieldset
      label="Content"
      :state="$v.form.content.$invalid && !$v.form.content.$dirty ? 'warning' : 'success'"
      :label-size="1">
      <b-form-input v-model.trim="form.content" type="text"></b-form-input>
      <small v-if="!$v.form.content.minLength" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        {{$v.form.content.$params.minLength.min - form.content.length}} characters to go.
      </small>
    </b-form-fieldset>

    <b-form-fieldset
      label="Views"
      :state="$v.form.views.$invalid && !$v.form.views.$dirty ? 'warning' : 'success'"
      :label-size="1">
      <b-form-input v-model="form.views" type="number"></b-form-input>
    </b-form-fieldset>

    <b-form-fieldset
      label="Likes"
      :state="$v.form.likes.$invalid && !$v.form.likes.$dirty ? 'warning' : 'success'"
      :label-size="1">
      <b-form-input v-model="form.likes" type="number"></b-form-input>
    </b-form-fieldset>

    <div v-show="isLoading || error || success" class="pt-4">
      <spinner v-show="isLoading"></spinner>
      <b-alert :show="!isLoading && error !== false" variant="danger">{{ error.message }}</b-alert>
      <b-alert :show="!isLoading && success !== false" variant="success">Muve created!</b-alert>
    </div>

    <template slot="modal-footer">
      <b-btn @click.prevent="onCancel">Cancel</b-btn>
      <b-btn @click.prevent="onOk" variant="primary" :disabled="$v.form.$invalid">Create</b-btn>
    </template>

  </b-modal>
</template>

<script>
  import Axios from '@/services/Axios';
  import {required, alphaNum, between, minLength, numeric} from 'vuelidate/lib/validators';
  import Spinner from 'vue-simple-spinner';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import MuvesStore from '@/stores/MuvesStore';

  export default {
    name: 'muvesCreate',
    components: { Spinner },
    store: MuvesStore,
    data() {
      return {
        error: false,
        isLoading: false,
        success: false,
        form: {
          author: '',
          content: '',
          views: '',
          likes: '',
        },
      };
    },
    methods: {
      ...mapActions([
        'createMuve',
      ]),
      close() {
        this.$router.push({ name: 'muves' });
      },
      onOk() {
        this.success = false;
        this.isLoading = true;
        this.createMuve(this.form)
          .then(() => this.success = true)
          .catch(error => this.error = error)
          .finally(setTimeout(() => this.isLoading = false, 100));
      },
      onHidden() {
        console.log('onHidden');
        this.close();
      },
      onCancel() {
        console.log('onCancel');
        this.close();
      },
    },
    validations: {
      form: {
        author: {
          required,
          alphaNum,
        },
        content: {
          minLength: minLength(5),
        },
        views: {
          required,
          numeric,
        },
        likes: {
          required,
          numeric,
        },
      },
    },
  };
</script>

<style lang="scss">

</style>
