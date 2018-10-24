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
    if (ENV_SERVER) {
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
              router,
            });
          }
          return Promise.resolve();
        }));
        if (router.currentRoute.fullPath !== url) {
          reject(createError({
            message: 'Moved',
            location: router.currentRoute.fullPath,
            code: 301,
          }));
          return;
        }
        const app = new Vue({
          store,
          router,
          render: h => h(App),
        });
        resolve({ app, store, router });
      }, reject);
    }
    if (ENV_CLIENT) {
      // eslint-disable-next-line global-require
      const NProgress = require('nprogress');
      router.onReady(() => {
        router.beforeResolve(async (to, from, next) => {
          const matched = router.getMatchedComponents(to);
          const prevMatched = router.getMatchedComponents(from);

          let diffed = false;
          // eslint-disable-next-line no-return-assign
          const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));

          if (!activated.length) {
            return next();
          }
          NProgress.start();

          try {
            await Promise.all(activated.map((c) => {
              if (c.asyncData) {
                return c.asyncData({ store, route: to });
              }
              return Promise.resolve();
            }));
            NProgress.done();
          } finally {
            next();
          }
          return null;
        });
      });
      const app = new Vue({
        store,
        router,
        render: h => h(App),
      });
      resolve({ app, store, router });
    }
  });
}
