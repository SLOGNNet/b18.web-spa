const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../config/helpers');
module.exports = {
    entry: './layout/index.js',
    output: {
        path: helpers.root('layout/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css', 'sass']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './layout/index.html',
          inject: true
      }),
      new ExtractTextPlugin('style.css')
    ],
    devServer: {
      port: 3005,
      host: 'localhost',
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      outputPath: helpers.root('layout/dist')
    },
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
}
