var webpack = require('webpack');

module.exports = {
  entry: {
    index: './www/js/index.jsx',
    vendor: [
      'react',
      'react-router',
      'alt',
      'alt-connect',
      'reactcss',
      'reactcss-decorator',
      'axios',
      'debug',
      'bluebird'
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
      new webpack.ProvidePlugin({Promise: 'bluebird'}),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/index.js', ['index'])
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel?stage=0', 'react-map-styles'],
      exclude: /(node_modules|bower_components)/
    }]
  }
};
