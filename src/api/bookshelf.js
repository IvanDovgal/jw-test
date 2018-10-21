import { httpClient } from '../tools';

function defer(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


const api = {
  async fetchShelvesList({ user }) {
    const response = await httpClient.get('/api/userbooks/bookshelf/', {
      params: {
        user,
      },
    });
    return response.data;
  },
  async fetchBookshelf({ user, page, shelf }) {
    const response = await httpClient.get('/api/userbooks/', {
      params: {
        user,
        bookshelf: shelf,
        page,
      },
    });
    return response.data;
  },

};

export default api;
