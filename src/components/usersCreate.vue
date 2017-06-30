<template>
  <b-modal id="usersCreate" title="Create an user" @hidden="onHidden" @cancel="onCancel" @ok="onOk" :visible="true">

    <b-form-fieldset label="Email"
                     :state="$v.form.email.$invalid ? 'warning' : 'success'"
                     :label-size="1">
      <b-form-input v-model.trim="form.email" type="email"></b-form-input>
      <small v-if="!$v.form.email.required" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        Field is required
      </small>
    </b-form-fieldset>

    <b-form-fieldset
      label="Password"
      :state="$v.form.password.$invalid && !$v.form.password.$dirty ? 'warning' : 'success'"
      :label-size="1">
      <b-form-input v-model.trim="form.password" type="password"></b-form-input>
      <small v-if="!$v.form.password.required" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        Field is required
      </small>
      <small v-if="!$v.form.password.minLength" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        {{$v.form.password.$params.minLength.min - form.password.length}} characters to go.
      </small>
    </b-form-fieldset>

    <b-form-fieldset
      label="First name"
      :state="$v.form.firstName.$invalid && !$v.form.firstName.$dirty ? 'warning' : 'success'"
      :label-size="1">
      <b-form-input v-model="form.firstName" type="text"></b-form-input>
      <small v-if="!$v.form.firstName.required" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        Field is required
      </small>
      <small v-if="!$v.form.firstName.minLength" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        {{$v.form.firstName.$params.minLength.min - form.firstName.length}} characters to go.
      </small>
    </b-form-fieldset>

    <b-form-fieldset
      label="Last name"
      :state="$v.form.lastName.$invalid && !$v.form.lastName.$dirty ? 'warning' : 'success'"
      :label-size="1">
      <b-form-input v-model="form.lastName" type="text"></b-form-input>
      <small v-if="!$v.form.lastName.required" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        Field is required
      </small>
      <small v-if="!$v.form.lastName.minLength" role="alert" aria-live="assertive" aria-atomic="true"
             class="form-text form-control-feedback">
        {{$v.form.lastName.$params.minLength.min - form.lastName.length}} characters to go.
      </small>
    </b-form-fieldset>

    <div v-show="isLoading || error || success" class="pt-4">
      <spinner v-show="isLoading"></spinner>
      <b-alert :show="!isLoading && error !== false" variant="danger">{{ error.message }}</b-alert>
      <b-alert :show="!isLoading && success !== false" variant="success">User created!</b-alert>
    </div>

    <template slot="modal-footer">
      <b-btn @click.prevent="onCancel">Cancel</b-btn>
      <b-btn @click.prevent="onOk" variant="primary" :disabled="$v.form.$invalid">Create</b-btn>
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
    name: 'usersCreate',
    components: { Spinner },
    store: UsersStore,
    data() {
      return {
        error: false,
        isLoading: false,
        success: false,
        form: {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        },
      };
    },
    methods: {
      ...mapActions([
        'createUser',
      ]),
      close() {
        this.$router.push({ name: 'users' });
      },
      onOk() {
        this.success = false;
        this.isLoading = true;
        this.createUser(this.form)
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
      submit() {
        return Axios.post('/users', this.form);
      },
    },
    validations: {
      form: {
        email: {
          required,
          email: email,
        },
        password: {
          required,
          minLength: minLength(5),
        },
        firstName: {
          required,
          minLength: minLength(2),
        },
        lastName: {
          required,
          minLength: minLength(2),
        },
      },
    },
  };
</script>

<style lang="scss">

</style>
