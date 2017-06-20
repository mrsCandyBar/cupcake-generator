var path = require('path');
var webpack = require('gulp-webpack');

module.exports = {
    entry: "./build/js/main.js",
    output: {
        path: "/assets/js/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ]
    }

    
};