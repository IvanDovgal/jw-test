import Vue from 'vue'
import  { createRenderer } from 'vue-server-renderer'
import template from './index.template.html';
import App from '../../../src/components/App.vue'
import { createApp } from '../../../src';

const renderer = createRenderer({
  template
});

export async function render(req, res) {
  const { app } = createApp({
    url: req.url
  })
  const html = await renderer.renderToString(app, {
    title: 'Test'
  });
  res.send(html);
}