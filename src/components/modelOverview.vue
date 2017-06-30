<template>
  <b-list-group>
    <b-list-group-item v-for="item in items" :action="true" @click.native="onClick(model)">
      <slot name="item" :item="item">
        {{ item.id }}
      </slot>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
  export default {
    name: 'modelOverview',
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    methods: {
      onClick(model) {
        console.log('clicked item.id ::: ', model.id);
      },
    },
  };
</script>

<style lang="scss">
  .alert {
    margin-bottom: 0px;
  }
</style>
