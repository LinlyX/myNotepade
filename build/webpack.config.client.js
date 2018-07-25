/**
 * 依赖webpack.config.bese.js进行后续的配置
 */

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base.js')
const isDev = process.env.NODE_ENV === 'development'

let config

const defaultPlugins = [
  new HTMLPlugin({
    template: path.join(__dirname, '../index.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer: devServer,
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkHash:8].js'
    },
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        })
      }]
    },
    plugins: defaultPlugins.concat([
      new ExtractTextPlugin('style.[contentHash:8].css')
    ]),
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        chunks: 'all' // 默认将node_modules中的代码打包到vendor中
      }
      // splitChunks: {
      //   cacheGroups: {
      //     commons: {
      //       name: 'vendor',
      //       chunks: 'initial',
      //       minChunks: 1
      //     }
      //   }
      // }
    }
  })
}

module.exports = config
