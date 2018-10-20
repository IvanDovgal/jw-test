const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.MODE || 'development';

const modePlugins = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const devtool = {
  production: 'source-map',
  development: 'inline-source-map',
};

const sharedRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'raw-loader',
        options: {},
      },
    ],
  },
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {},
      },
    ],
  },
];

const sharedPlugins = [
  new VueLoaderPlugin(),
  ...(modePlugins[mode] || []),
];

const clientConfig = {
  mode,
  name: 'client',
  entry: [
    ...(mode === 'development' ? ['webpack-hot-middleware/client'] : []),
    './client/index.js',
  ],
  target: 'web',
  output: {
    filename: 'app.js',
    chunkFilename: '[id].bundle.js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
  },
  plugins: [
    ...sharedPlugins,
    new webpack.DefinePlugin({
      ENV: JSON.stringify('client'),
      ENV_SERVER: false,
      ENV_CLIENT: true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    rules: [
      ...sharedRules,
      mode !== 'production'
        ? {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
          ],
        }
        : {
          test: /\.css$/,
          use: [
            'ignore-loader',
          ],
        },
    ],
  },
  devtool: devtool[mode],
  ...(mode === 'production' ? {
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles', test: /\.css$/, chunks: 'all', enforce: true,
          },
        },
      },
    },
  } : {}),
};

const serverConfig = {
  mode,
  name: 'server',
  entry: './server/app.js',
  target: 'node',
  output: {
    filename: 'app.js',
    chunkFilename: '[id].app.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
    ...sharedPlugins,
    new webpack.DefinePlugin({
      ENV: JSON.stringify('server'),
      ENV_SERVER: true,
      ENV_CLIENT: false,
      ADDITIONAL_META: JSON.stringify(mode === 'production'
        ? '<link rel="stylesheet" type="text/css" href="/styles.css">'
        : ''),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    ...(mode === 'production'
      ? [new CopyWebpackPlugin([
        './package.json',
        { from: './server/index.js', to: 'server.js' },
      ])]
      : []),
    new MiniCssExtractPlugin({
      filename: 'client/styles.css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  node: {
    __dirname: false,
    __pathname: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      ...sharedRules,
      {
        test: /\.css$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devtool: devtool[mode],
};

module.exports = [serverConfig, clientConfig];
Object.assign(module.exports, { serverConfig, clientConfig });
