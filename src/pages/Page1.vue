<template>
  <div>
    this is page 1
    <router-link to="/page2">link</router-link>
  </div>
</template>
<script>
import pick from 'lodash/pick';

export default {
  methods: {
    pick,
  },
};
</script>
<style scoped>
  div {
    font-size: 10px;
  }
</style>
