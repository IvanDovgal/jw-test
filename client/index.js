/* eslint-env browser */
import { createApp as initialCreateApp } from '../src';

async function startApp(createApp, state = null) {
  const { app } = await createApp({
    url: window.location.pathname,
    state,
  });

  app.$mount('#app');
}

// eslint-disable-next-line no-undef,no-underscore-dangle
startApp(initialCreateApp, window.__INITIAL_STATE__);
if (module.hot) {
  module.hot.accept('../src', () => {
    const { createApp } = require('../src'); // eslint-disable-line global-require
    startApp(createApp);
  });
}
