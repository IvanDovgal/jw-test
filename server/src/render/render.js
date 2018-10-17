import { createRenderer } from 'vue-server-renderer';
import template from './index.template.html';
import { createApp } from '../../../src';

const renderer = createRenderer({
  template
});

export async function render(req, res) {
  try {
    const { app, store } = await createApp({
      url: req.url
    });
    const html = await renderer.renderToString(app, {
      title: 'Test', state: store.state
    });
    res.send(html);
  } catch (e) {
    if(e.code !== 404)
      return res.send(template);
    res.status(404).send('Not found!')
  }
}