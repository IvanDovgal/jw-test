import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import { createStore } from './store';
import { createRouter } from './routes';

Vue.use(VueRouter);
Vue.use(Vuex);

const createError = ({ message, ...others }) => {
  const error = new Error(message);
  Object.assign(error, others);
  return error;
};

// eslint-disable-next-line import/prefer-default-export
export function createApp(context) {
  return new Promise((resolve, reject) => {
    const { url } = context;
    const store = createStore(context);
    const router = createRouter();
    if (context.state) {
      store.replaceState(context.state);
    }
    if (url) router.push(url);
    router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject(createError({
          message: 'Not found',
          code: 404,
        }));
        return;
      }
      await Promise.all(matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
          });
        }
        return Promise.resolve();
      }));
      const app = new Vue({
        store,
        router,
        render: h => h(App),
      });
      resolve({ app, store, router });
    }, reject);
  });
}
