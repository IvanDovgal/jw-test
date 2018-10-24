/* globals  ADDITIONAL_META */
import { createRenderer } from 'vue-server-renderer';
import template from './index.template.html';
import { createApp } from '../../../src';

const renderer = createRenderer({
  template,
});

export default async function (req, res) {
  try {
    const { app, store } = await createApp({
      url: req.url,
    });
    const html = await renderer.renderToString(app, {
      staticMeta: ADDITIONAL_META,
      title: 'Test',
      state: store.state,
    });
    res.send(html);
  } catch (e) {
    if (e.code === 404) {
      res.status(404).send('Not found!');
    } else
    if (e.code === 301 || e.code === 302) {
      res.status(e.code).header('Location', e.location).send('');
    } else res.status(e.code).send(template);
  }
}
