import { createApp } from '../src';

function startApp(createApp) {
  const { app } = createApp({
    url: window.location.pathname
  });

  app.$mount('#app');
}

startApp(createApp);
if (module.hot) module.hot.accept('../src', function () {
  console.log('update')
  const { createApp } = require('../src');
  startApp(createApp);
});