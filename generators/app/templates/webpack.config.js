var webpack = require('webpack');

module.exports = {
  entry: {
    index: './www/js/index.jsx',
    vendor: [
      'react',
      'react-router',
      'alt',
      'alt-connect',
      'es6-react-mixins',
      'axios',
      'debug'
    ]
  },
  output: {
    path: __dirname + '/www/js/',
    filename: '[name].js',
    publicPath: '/www/js/'
  },
  resolve: {
    extensions: ['', '.json', '.node', '.js', '.jsx']
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/index.js', ['index']),
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/
    }]
  }
};
