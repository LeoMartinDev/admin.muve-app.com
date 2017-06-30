<template>
  <div class="col-12">
    <b-card header="Muves"
            class="mb-2"
            show-footer>
      <template slot="header">
        <div class="d-flex justify-content-between">
          <b-form-input v-model="filter" class="col-5" placeholder="Type to Search"></b-form-input>
          <b-btn class="col-1 btn-block" :to="{ name: 'muves.create' }" variant="primary">Create</b-btn>
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
          <template slot="author" scope="{ item }">
            {{ item.author.email }}
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
  import MuvesStore from '@/stores/MuvesStore';

  export default {
    components: {Spinner},
    beforeRouteEnter(to, from, next) {
      if (!MuvesStore.getters.isEmpty) return next();
      console.log('getMuves');
      MuvesStore.dispatch('getMuves')
        .then(next)
        .catch(error => console.error('beforeRouteEnter error ::: ', error));
    },
    store: MuvesStore,
    data() {
      return {
        isLoading: false,
        error: false,
        fields: {
          author: {
            label: 'Author',
            sortable: true,
          },
          content: {
            label: 'Content',
          },
          music: {
            label: 'Music',
          },
          views: {
            label: 'Views',
            sortable: true,
          },
          likes: {
            label: 'Likes',
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
        items: 'muves',
      }),
    },
    methods: {
      ...mapActions([
        'getMuves',
      ]),
      refresh() {
        this.isLoading = true;
        MuvesStore.dispatch('getMuves')
          .catch(error => this.error = error)
          .finally(this.isLoading = false);
      },
      read(item) {
        this.$router.push({name: 'muves.read', params: {id: item.id}});
      },
      update(item) {
        this.$router.push({name: 'muves.update', params: {id: item.id}});
      },
      destroy(item) {
        this.$router.push({name: 'muves.destroy', params: {id: item.id}});
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
