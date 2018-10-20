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
    if (e.code !== 404) {
      res.send(template);
      return;
    }
    res.status(404).send('Not found!');
  }
}
