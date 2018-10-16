module.exports = [{
  entry: './server/index.js',
  output: {
    filename: './server.js',
    libraryTarget: 'commonjs'
  },
}, {
  entry: './client/index.js',
  output: {
    filename: './client/app.js',
    libraryTarget: 'amd'
  }
}];