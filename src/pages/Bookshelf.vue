<template>
  <div>
    <shelves-list
            :shelves="$store.state.bookshelf.shelves.list"
            :user="$store.state.bookshelf.user"
            :current-shelf="$store.state.bookshelf.shelf"
    />
    <sorting
            :current="$store.state.bookshelf.order"
            v-on:change="setOrder"
            :fields="[{
            id: 'created',
            name: 'По дате добавления'
            }, {
            id: 'work__default_edition__title',
            name: 'По названию'
            }]"
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
import findIndex from 'lodash/findIndex';
import LoadMore from '../directives/LoadMore';
import BookList from '../components/BookList.vue';
import ShelvesList from '../components/ShelvesList.vue';
import titleMixin from '../mixins/title';
import Sorting from '../components/Sorting.vue';

export default {
  mixins: [titleMixin],
  components: { Sorting, ShelvesList, BookList },
  directives: {
    'load-more': LoadMore,
  },
  title() {
    const currentShelf = this.$store.state.bookshelf.shelf;
    const shelvesList = this.$store.state.bookshelf.shelves.list;
    return shelvesList[findIndex(shelvesList, { id: currentShelf })].name;
  },
  async asyncData({ route, store, router }) {
    const { user, shelf } = route.params;
    const { order } = route.query;
    if (shelf) {
      return store.dispatch('bookshelf/fetchBookshelf', {
        user,
        shelf: Number(shelf),
        order,
      });
    }
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
    const { order } = to.query;
    if (!isMatch(from.params, { user, shelf }) || !isMatch(from.query, { order })) {
      await this.$store.dispatch('bookshelf/fetchBookshelf', {
        user,
        shelf: Number(shelf),
        order,
      });
    }
    next();
  },
  methods: {
    async fetchNextPage() {
      await this.$store.dispatch('bookshelf/fetchBookshelfNextPage');
    },
    async setOrder(order) {
      return this.$router.push({
        name: 'user-bookshelf-shelf',
        params: {
          user: this.$store.state.bookshelf.user,
          shelf: this.$store.state.bookshelf.shelf,
        },
        query: {
          order,
        },
      });
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
