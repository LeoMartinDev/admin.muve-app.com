<template>
  <div class="col-12">
    <b-card header="Users"
            class="mb-2"
            show-footer>
      <template slot="header">
        <div class="d-flex justify-content-between">
          <b-form-input v-model="filter" class="col-5" placeholder="Type to Search"></b-form-input>
          <b-btn class="col-1 btn-block" :to="{ name: 'users.create' }" variant="primary">Create</b-btn>
        </div>
      </template>
      <div v-show="isLoading || error" class="p-4">
        <spinner v-show="isLoading"></spinner>
        <b-alert :show="!isLoading && error !== false" variant="danger">{{ error.message }}</b-alert>
      </div>
      <div v-show="!isLoading && !error">
        <!-- Main table element -->
        <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage"
                 :filter="filter">
          <template slot="fullName" scope="{ item }">
            {{ item.firstName }} {{ item.lastName }}
          </template>
          <template slot="gender" scope="item">
            <icon :name="item.gender === 'male' ? 'mars' : 'venus'"></icon>
          </template>
          <template slot="actions" scope="{ item }">
            <b-button-group size="sm">
              <b-button @click="read(item)">
                <icon name="eye"></icon>
              </b-button>
              <b-button @click="update(item)">
                <icon name="edit"></icon>
              </b-button>
            </b-button-group>
            <b-button @click="destroy(item)" variant="danger" size="sm">
              <icon name="trash"></icon>
            </b-button>
          </template>
        </b-table>
      </div>
      <template slot="footer">
        <div class="d-flex justify-content-between">
          <b-btn @click.prevent="refresh">
            <icon name="refresh"></icon>
          </b-btn>
          <b-pagination size="md" :total-rows="this.items.length" :per-page="perPage" v-model="currentPage"/>
          <b-form-select :options="[{text: 15, value: 15}, {text: 50, value: 50}, {text: 100, value: 100}]"
                         v-model="perPage"></b-form-select>
        </div>
      </template>
    </b-card>
    <router-view></router-view>
  </div>
</template>

<script>
  import modelTable from '@/components/modelTable';
  import Spinner from 'vue-simple-spinner';
  import {mapState, mapActions} from 'vuex';
  import UsersStore from '@/stores/UsersStore';

  export default {
    components: {Spinner},
    beforeRouteEnter(to, from, next) {
      if (!UsersStore.getters.isEmpty) return next();
      console.log('getUsers');
      UsersStore.dispatch('getUsers')
        .then(next)
        .catch(error => console.error('beforeRouteEnter error ::: ', error));
    },
    store: UsersStore,
    data() {
      return {
        isLoading: false,
        error: false,
        fields: {
          email: {
            label: 'Email',
            sortable: true,
          },
          fullName: {
            label: 'Fullname',
          },
          gender: {
            label: 'Gender',
          },
          birthday: {
            label: 'Birthday',
          },
          createdAt: {
            label: 'Created at',
            sortable: true,
          },
          actions: {
            label: 'Actions',
          },
        },
        currentPage: 1,
        perPage: 15,
        filter: null
      };
    },
    computed: {
      ...mapState({
        items: 'users',
      }),
    },
    methods: {
      ...mapActions([
        'getUsers',
      ]),
      refresh() {
        this.isLoading = true;
        UsersStore.dispatch('getUsers')
          .catch(error => this.error = error)
          .finally(this.isLoading = false);
      },
      read(item) {
        console.log(item)
        this.$router.push({name: 'users.read', params: {id: item.id}});
      },
      update(item) {
        this.$router.push({name: 'users.update', params: {id: item.id}});
      },
      destroy(item) {
        this.$router.push({name: 'users.destroy', params: {id: item.id}});
      },
    },
  };
</script>

<style lang="scss">
  .card-block {
    padding: 0;
  }

  .table {
    margin-bottom: 0;
  }

  .form-group {
    margin-bottom: 0;
  }
</style>
