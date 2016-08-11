const webpack = require('webpack');
module.exports = {
  entry: {
    'observe.browser':'./observe.js',
  },
  output: {
    filename: '[name].js',
    library:'xObjectObserve',
    libraryTarget:'var'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
