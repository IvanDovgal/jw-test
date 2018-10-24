import isMatch from 'lodash/isMatch';
import { bookshelfApi } from '../../api';

export const mutations = {
  requestFetchShelvesList(state, { user }) {
    state.shelves = {
      setOn: ENV,
      state: 'pending',
      error: null,
      list: [],
      user,
    };
  },
  successFetchShelvesList(state, { user, list }) {
    state.shelves = {
      setOn: ENV,
      user,
      state: 'success',
      error: null,
      list,
    };
  },
  failFetchShelvesList(state, { user, error }) {
    state.shelves = {
      setOn: ENV,
      user,
      state: 'fail',
      error,
    };
  },
  requestFetchBookshelf(state, { user, shelf, page }) {
    this.state.setOn = ENV;
    if (isMatch(state, { user, shelf })) {
      if (isMatch(state, { page })) return;
      state.state = 'page-pending';
    } else {
      state.state = 'pending';
    }
    state.shelf = shelf;
    state.page = page;
    state.user = user;
  },
  successFetchBookshelf(state, { user, data, page }) {
    state.setOn = ENV;
    state.user = user;
    state.state = 'success';
    state.page = page;
    state.list = state.list.filter(({ page: itemPage }) => itemPage < data.page).concat([data]);
  },
  failFetchBookshelf(state, { user, error }) {
    state.setOn = ENV;
    state.user = user;
    state.state = 'fail';
    state.error = error;
  },
};

export const actions = {

  async fetchShelves({ commit, state }, { user }) {
    if (isMatch(state.shelves, { user, state: 'success' })) return;
    commit('requestFetchShelvesList', { user });
    try {
      const list = await bookshelfApi.fetchShelvesList({ user });
      commit('successFetchShelvesList', { user, list });
    } catch (error) {
      commit('failFetchShelvesList', { error });
    }
  },

  async fetchBookshelf({ commit, dispatch, state }, { user, shelf, page = 1 }) {
    if (isMatch(state, { user, shelf, state: 'page-pending' })) return;
    if (isMatch(state, {
      user, shelf, page, state: 'success',
    })) return;
    commit('requestFetchBookshelf', { user, shelf, page });
    try {
      await dispatch('fetchShelves', { user });
      const fetchShelf = shelf || state.shelves.list[0].id;
      const data = await bookshelfApi.fetchBookshelf({ user, shelf: fetchShelf, page });
      commit('successFetchBookshelf', { page, data, user });
    } catch (error) {
      commit('failFetchBookshelf', { user, error });
    }
  },

  async fetchBookshelfNextPage({ dispatch, state }) {
    if (state.list.length && !state.list[state.list.length - 1].has_next) return;
    const page = state.list.length + 1;
    const { user, shelf } = state;
    await dispatch('fetchBookshelf', { page, user, shelf });
  },

};

const getters = {
  canFetchNextPage(state) {
    if (state.state === 'pending' || state.state === 'page-pending') return false;
    if (state.list.length && !state.list[state.list.length - 1].has_next) return false;
    return true;
  },
};

const definition = {
  namespaced: true,
  mutations,
  actions,
  getters,
};

export default function bookshelf(state = {
  shelves: {
    setOn: ENV,
    user: null,
    state: 'none',
    error: null,
    list: [],
  },
  shelf: null,
  page: 0,
  setOn: ENV,
  user: null,
  state: 'none',
  error: null,
  list: [],
}) {
  return {
    state,
    ...definition,
  };
}
