<template>
    <div>
        <div class="book-row" v-bind:key="index" v-for="(books, index) in bookRows">
            <book :key="book.id"
                  class="book"
                  v-for="book in books"
                  :title="book.work.title"
                  :author="book.work.authors_titles"
                  :image="book.work.cover"
            />
        </div>
    </div>
</template>

<script>
import chunk from 'lodash/chunk';
import Book from './Book.vue';

export default {
  props: ['books'],
  components: { Book },
  name: 'BookList',
  computed: {
    bookRows() {
      return chunk(this.books, 3);
    },
  },
};
</script>

<style scoped lang="css">
    .book-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start;
    }

    .book {
        flex: 0 0 auto;
        flex-basis: 15%;
        align-self: center;
    }
</style>
