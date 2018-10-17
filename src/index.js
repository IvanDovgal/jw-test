import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue'
import { createStore } from './store';

Vue.use(Vuex)

export function createApp(context) {
  const store = createStore(context)
  if(context.state) {
    store.replaceState(context.state)
  }
  const app = new Vue({
    store,
    render: h => h(App)
  })
  return { app, store }
}