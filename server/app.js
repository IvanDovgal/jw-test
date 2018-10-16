import express from 'express';

import { render } from './src/render/render';

const app = express();

app.get('*', render);

export default (options) => app
