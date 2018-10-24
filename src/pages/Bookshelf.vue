<template>
  <div>
    <shelves-list
            :shelves="$store.state.bookshelf.shelves.list"
            :user="$store.state.bookshelf.user"
            :current-shelf="$store.state.bookshelf.shelf"
    />
    <div
            v-load-more="fetchNextPage"
            v-bind:key="page.page"
            class="bookshelf-page"
            v-for="page in $store.state.bookshelf.list"
    >
      <book-list :books="page.objects" />
      <div class="page-indicator">{{page.page}}</div>
    </div>
  </div>
</template>

<script>
import isMatch from 'lodash/isMatch';
import LoadMore from '../directives/LoadMore';
import BookList from '../components/BookList.vue';
import ShelvesList from '../components/ShelvesList.vue';

export default {
  components: { ShelvesList, BookList },
  directives: {
    'load-more': LoadMore,
  },
  async asyncData({ route, store, router }) {
    const { user, shelf } = route.params;
    if (shelf) return store.dispatch('bookshelf/fetchBookshelf', { user, shelf });
    await store.dispatch('bookshelf/fetchShelves', { user });
    return router.push({
      name: 'user-bookshelf-shelf',
      params: {
        user,
        shelf: store.state.bookshelf.shelves.list[0].id,
      },
    });
  },
  async beforeRouteUpdate(to, from, next) {
    const { user, shelf } = to.params;
    if (!isMatch(from.params, { user, shelf })) {
      await this.$store.dispatch('bookshelf/fetchBookshelf', { user, shelf });
    }
    next();
  },
  methods: {
    async fetchNextPage() {
      await this.$store.dispatch('bookshelf/fetchBookshelfNextPage');
    },
  },

};
</script>

<style scoped>
  .page-indicator {
    text-align: center;
    border-bottom: 1px dotted #63a8bc;
  }
  .bookshelf-page {
  }
</style>
