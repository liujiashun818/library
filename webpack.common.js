const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

const lessDev = ['style-loader', 'css-loader',  {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    config: {
      path: '.postcssrc.js',
    },
  },
}, 'less-loader'];
const lessProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader',  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      importLoaders: true,
      modules: false,
      localIdentName: '[name]_[local]_[hash:base64:3]',
      minimize: true,
      config: {
        path: '.postcssrc.js',
      },
    },
  }, 'less-loader'],
});
const lessConfig = isProd ? lessProd : lessDev;
console.log('?process.env.NODE_ENV??', process.env.NODE_ENV);

module.exports = {
  devtool: 'source-map',
  entry: {
    'app.bundle': './view/app.js',
    // contact: './view/contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './view/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      // 这行是第二个contact.html新增的。暂时把contact.html给删除了
      // excludeChunks: ['contact'],
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
      { test: /\.less$/, use: lessConfig },
      {//antd样式处理
        test:/\.css$/,
        exclude:/src/,
        use:[
            { loader: "style-loader",},
            {
                loader: "css-loader",
                options:{
                    importLoaders:1
                }
            }
        ]
      },
      { 
        test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
        options: {
          plugins: [
            ['import', {
                libraryName: 'antd',
                style: 'css'
            }]
        ]
        },
        exclude: /node_modules/ 
      },
      // { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
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
        // loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
};