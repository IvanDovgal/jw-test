const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const PORT = process.env.PORT || 3000

const webpackConfig = require('../webpack.config');
const { serverConfig, clientConfig } = webpackConfig;

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  index: false,
  publicPath: '/',
  serverSideRender: true,
  stats: 'minimal',
}));

const clientCompiler = compiler.compilers.find(compiler => compiler.name == 'client');
const serverCompiler = compiler.compilers.find(compiler => compiler.name == 'server');

app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(compiler));


app.listen(PORT);
