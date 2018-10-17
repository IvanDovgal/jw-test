const Vuex = require('vuex');
const Vue = require('vue');
const mapValues = require('lodash/mapValues')

const createConfig = ({ root, ...modules }, states = {}) => {
  return {
    ...root(),
    modules: mapValues(modules, (module, name) => module(states[name]))
  };
}

const internalCreateStore = (modules, context) => new Vuex.Store(createConfig(modules));

if(process.env.NODE_ENV === 'production') {
    let useModules = require('./modules');
    module.exports.createStore = (context) => internalCreateStore(useModules, context)
} else {
  if (ENV === 'server') {
    let useModules = require('./modules');
    module.exports.createStore = (context) => internalCreateStore(useModules, context)
    if (module.hot) {
      module.hot.accept('./modules', () => {
        useModules = require('./modules')
      })
    }
  }

  if (ENV === 'client') {
    let store = null;
    module.exports.createStore = (context) => store ? store : store = internalCreateStore(require('./modules'), context)
    if (module.hot) {
      module.hot.accept('./modules', () => {
        const config = createConfig(require('./modules'));
        store.hotUpdate(config)
        console.log('store updated!')
      })
    }
  }
}