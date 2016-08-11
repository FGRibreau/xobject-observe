const webpack = require('webpack');
module.exports = {
  entry: {
  },
  output: {
    filename: 'dist/[name].js',
    library: 'xObjectObserve',
    libraryTarget: 'var'
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
