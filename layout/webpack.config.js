const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './layout/index.js',
    output: {
        path: './layout/dist',
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
          inject: 'head'
      }),
      new ExtractTextPlugin('style.css')
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
}
