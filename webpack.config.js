var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

var common = {
    //entry: PATHS.app,
    entry: './app/cats.jsx',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'React Cats',
            filename: 'cats.html'
        })
    ]
};


if(TARGET === 'start' || !TARGET) {

    module.exports = merge(common,{

        devtool: 'eval-source-map',

        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            stats: 'errors-only',

            host: process.env.HOST,
            port: process.env.PORT
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]

    });

}

if(TARGET === 'build') {
    module.exports = merge(common, {
        output: {
            path: PATHS.build,
            filename: 'bundle.js'
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}