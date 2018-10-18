const Vuex = require('vuex');
const Vue = require('vue');
const mapValues = require('lodash/mapValues')

const createConfig = ({ root, ...modules }, states = {}) => {
  return {
    ...root(),
    modules: mapValues(modules, (module, name) => module(states[name]))
  };
}

export let createStore;

const internalCreateStore = (modules, context) => new Vuex.Store(createConfig(modules));

if (process.env.NODE_ENV === 'development') {
  if (ENV === 'server') {
    let useModules = require('./modules');
    createStore = (context) => internalCreateStore(useModules, context);
    if (module.hot) {
      module.hot.accept('./modules', () => {
        useModules = require('./modules');
      });
    }
  }

  if (ENV === 'client') {
    let store = null;
    createStore = (context) => store ? store : store = internalCreateStore(require('./modules'), context);
    if (module.hot) {
      module.hot.accept('./modules', () => {
        const config = createConfig(require('./modules'));
        store.hotUpdate(config);
        console.log('store updated!');
      });
    }
  }
} else {
  let useModules = require('./modules');
  createStore = (context) => internalCreateStore(useModules, context)
}