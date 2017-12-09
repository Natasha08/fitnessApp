'use strict';

const path = require('path');
const lodash = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const htmlWebpackPluginOptions = {
  inject: false,
  template: require('html-webpack-template'),

  appMountId: 'app',
  title: 'Eat and Play Well',
  baseHref: './',
  meta: [{ name: 'viewport', content: 'initial-scale=1, user-scalable=no' }],
  scripts: [],
};

module.exports = {
  entry: [path.join(__dirname, 'src', 'app.js')],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '',
    filename: 'app.js'
  },
  devtool: "inline-sourcemap",
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDom': 'react-dom',
      'Redux': 'redux',
      '_': 'lodash'
    }),

    new webpack.DefinePlugin({
      'process.env': env_vars
    }),

    new HtmlWebpackPlugin(htmlWebpackPluginOptions),

    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'public'),
        from: '**/*',
        to: path.join(__dirname, 'www')
      }
    ])
  ],
  module: {
    loaders: [
      {
        test: /(\.scss|\.sass|\.css)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=50240&absolute&name=images/[path][name]-[hash:7].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:7].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-react-jsx', 'transform-object-rest-spread',  'transform-decorators-legacy', 'transform-class-properties']
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    alias: {
      'spec': path.resolve(__dirname, 'spec'),
    }
  },
  devServer: {
    port: '3001'
  }
};
