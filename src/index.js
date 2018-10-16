import Vue from 'vue';
import App from './components/App.vue'

export function createApp(context) {
  const app = new Vue({
    data: {
      url: context.url
    },
    render: h => h(App)
  })
  return { app }
}