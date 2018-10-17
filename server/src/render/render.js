import Vue from 'vue'
import  { createRenderer } from 'vue-server-renderer'
import template from './index.template.html';
import App from '../../../src/components/App.vue'
import { createApp } from '../../../src';

const renderer = createRenderer({
  template
});

export async function render(req, res) {
  const { app, store } = createApp({
    url: req.url
  })
  const html = await renderer.renderToString(app, {
    title: 'Test',
    state: store.state
  });
  res.send(html);
}