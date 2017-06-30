<template>
  <div id="app">
    <div class="container">
      <navbar brand="Muve"></navbar>
      <div class="mt-4">
<!--        <keep-alive>
          <router-view v-if="!$route.meta || $route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from '@/components/navbar';

  export default {
    name: 'app',
    data() {
      return {};
    },
    components: {navbar},
    methods: {},
  }
</script>

<style lang="scss">
  .alert {
    margin-bottom: 0px;
  }
  .btn:hover {
    cursor: pointer;
  }
</style>
