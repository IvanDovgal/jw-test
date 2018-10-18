import express from 'express';
import proxy from 'express-http-proxy';
import render from './src/render/render';
import { API_PATHS, PROXY_ENTRY } from '../src/constants';
import prepareApiBody from '../src/misc/prepareApiBody';

const { server: API_PATH } = API_PATHS;

const app = express();

app.use(PROXY_ENTRY, proxy(API_PATH, {
  proxyReqPathResolver(req) {
    return `${PROXY_ENTRY}${req.url}`;
  },
  userResDecorator(proxyRes, proxyResData) {
    return prepareApiBody(proxyResData.toString('utf8'));
  },
}));

app.get('*', render);


export default () => app;
