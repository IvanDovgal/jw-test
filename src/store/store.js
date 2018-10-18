const Vuex = require('vuex');
const mapValues = require('lodash/mapValues');

const createConfig = ({ root, ...modules }, states = {}) => ({
  ...root(),
  modules: mapValues(modules, (module, name) => module(states[name])),
});

// eslint-disable-next-line import/no-mutable-exports,import/prefer-default-export
export let createStore;

const internalCreateStore = modules => new Vuex.Store(createConfig(modules));

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  if (ENV === 'server') {
    let useModules = require('./modules');
    createStore = context => internalCreateStore(useModules, context);
    if (module.hot) {
      module.hot.accept('./modules', () => {
        useModules = require('./modules');
      });
    }
  }

  if (ENV === 'client') {
    let store = null;
    // eslint-disable-next-line no-return-assign
    createStore = context => (store || (store = internalCreateStore(require('./modules'), context)));
    if (module.hot) {
      module.hot.accept('./modules', () => {
        const config = createConfig(require('./modules'));
        store.hotUpdate(config);
      });
    }
  }
} else {
  const useModules = require('./modules');
  createStore = context => internalCreateStore(useModules, context);
}
/* eslint-enable global-require */
