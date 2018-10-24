<template>
    <div class="book">
        <img :src="`${IMAGE_BASE}${image}`" class="image"/>
        <div>{{title}}</div>
        <div>{{author}}</div>
    </div>
</template>

<script>
import { IMAGE_BASE } from '../constants';

export default {
  data() {
    return {
      IMAGE_BASE,
    };
  },
  props: {
    title: String,
    author: String,
    image: String,
  },
  name: 'Book',
};
</script>

<style scoped>
    .image {
        width: 100%;
    }
    .book {
        padding: 1em 5em;
        text-align: center;
    }
</style>
