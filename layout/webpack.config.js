const webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              loader: 'style!css!sass?sourceMap'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css')
    ]
}