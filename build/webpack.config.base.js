/**
 * 这里放的是完全公共的配置，供别的配置文件引用
 */

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const creatVueLoaderOption = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web',
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': path.join(__dirname, '../node_modules/vue/dist/vue.js')
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules|build/,
      enforce: 'pre'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: creatVueLoaderOption(isDev)
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(png|gif|jpg|jpeg|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'resources/[path][name].[hash:8].[ext]' // 生成到dist底下的resource中，路径按照原路径已经名字命名
        }
      }]
    }

    ]
  }
}

module.exports = config
