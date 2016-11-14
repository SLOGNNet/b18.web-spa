const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',

    resolve: {
        extensions: ['', '.ts', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },

    entry: {
        'server.js': './src/app',
        'demo-emitter.js': './src/demo/demo-emitter'
    },


    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                loader: 'ts'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
           chunks: [],
           template: 'src/demo/index.html',
           filename: 'demo.html'
        })
    ],
    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        reasons: false,
        timings: true,
        version: false
    },

    externals: function checkNodeImport(context, request, cb) {
        if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
            cb(null, 'commonjs ' + request); return;
        }
        cb();
    },

    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
    },
};
