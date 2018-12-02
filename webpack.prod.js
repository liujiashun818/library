
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    'app.bundle': './view/entry/home.js',
    // contact: './src/contact.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 9000,
    open: true,
  },

})