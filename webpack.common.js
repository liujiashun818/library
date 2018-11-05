const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

const cssDev = ['style-loader', 'css-loader',  {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    config: {
      path: '.postcssrc.js',
    },
  },
}, 'less-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader',  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      config: {
        path: '.postcssrc.js',
      },
    },
  }, 'less-loader'],
});
const cssConfig = isProd ? cssProd : cssDev;
console.log('?process.env.NODE_ENV??', process.env.NODE_ENV);

module.exports = {
  devtool: 'source-map',
  entry: {
    'app.bundle': './src/app.js',
    contact: './src/contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      // 这行是第二个contact.html新增的。
      excludeChunks: ['contact'],
    }),

    new HtmlWebpackPlugin({
      template: './src/contact.html',
      filename: 'contact.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['contact'],
    }),

    new ExtractTextPlugin({
      filename: 'style.css',
      disable: !isProd,
    }),
    new CleanWebpackPlugin(['dist']),
    // 这两行是热更新用的
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      OBJ: JSON.stringify({ key1: 'this is value' }),
    }),
  ],
  module: {
    rules: [
      { test: /\.less$/, use: cssConfig },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      }, {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
};