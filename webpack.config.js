const webpack = require('webpack')
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

const mode = 'development'

const modePlugins = {
  development: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const sharedRules =
  [
    {
      test: /\.html$/,
      use: [
        {
          loader: 'raw-loader',
          options: {}
        }
      ]
    },
    {
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          options: {}
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }
  ];

const sharedPlugins = [
  new VueLoaderPlugin(),
  ...(modePlugins[mode] || [])
]

const clientConfig = {
  mode,
  name: 'client',
  entry: [
    ...(mode === 'development' ? ['webpack-hot-middleware/client'] : []),
    './client/index.js',
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
    filename: './app.js'
  },
  plugins: [
    ...sharedPlugins,
    new webpack.DefinePlugin({
      ENV: JSON.stringify('client'),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    rules: [
      ...sharedRules
    ]
  }
};

const serverConfig = {
  mode,
  name: 'server',
  entry: './server/app.js',
  target: 'node',
  output: {
    filename: './app.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    ...sharedPlugins,
    new webpack.DefinePlugin({
      ENV: JSON.stringify('server'),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([
      './package.json',
      { from: './server/index.js', to: 'server.js' }
    ])
  ],
  node: {
    __dirname: false,
    __pathname: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      ...sharedRules
    ]
  }
};

module.exports = [serverConfig, clientConfig];
Object.assign(module.exports, { serverConfig, clientConfig })