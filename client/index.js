import { createApp } from '../src';

async function startApp(createApp, state = null) {
  const { app, store } = await createApp({
    url: window.location.pathname,
    state
  });

  app.$mount('#app');
}

startApp(createApp, window.__INITIAL_STATE__);
if (module.hot) module.hot.accept('../src', function () {
  const { createApp } = require('../src');
  startApp(createApp);
});