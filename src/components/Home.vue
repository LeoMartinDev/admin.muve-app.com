<template>
  <div>
  </div>
</template>

<script>
  import Axios from '@/services/Axios';
  import modelOverview from '@/components/modelOverview';
  import Spinner from 'vue-simple-spinner';

  export default {
    name: 'Home',
    components: {
      modelOverview,
      Spinner,
    },
    created() {
      //this.initialize().then(() => {});
    },
    data() {
      return {
        lastMuvesLoading: true,
        lastMuves: [],
        lastMuvesError: false,
      };
    },
    methods: {
      getMuves() {
        return Axios.get(`muves?limit=15&sort`)
          .then(response => {
            console.log(response)
            this.lastMuves = response.data || [];
            this.lastMuvesLoading = false;
          })
          .catch(error => {
            this.lastMuvesError = error;
            this.lastMuvesLoading = false;
          });
      },
      initialize() {
        return this.getMuves();
      },
    },
  };
</script>

<style lang="scss">

</style>
