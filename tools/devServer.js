/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const PORT = process.env.PORT || 3000;

const webpackConfig = require('../webpack.config');

const app = express();
const multiCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(multiCompiler, {
  hot: true,
  index: false,
  publicPath: '/',
  serverSideRender: true,
  stats: 'minimal',
}));

const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');

app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(multiCompiler));


app.listen(PORT);
