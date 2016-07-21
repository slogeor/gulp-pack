var path = require('path');
var webpack = require('webpack');
var entryMap = require('./generate.entry.js');

module.exports = {
    cache: true,
    devtool: 'source-map',
    context: path.resolve(process.cwd()),
    entry: entryMap,
    output: {
        filename: '[name].min.js'
    },
    resolve: {
        root: path.resolve(process.cwd()),
        extensions: ['', '.js', '.json'],
        alias: {
            'pages': 'src/pages/',
            'components': 'src/pages/_components/'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            $$: 'angular',
            'jQuery': 'jquery',
            'moment': 'moment',
            'window.jQuery': 'jquery'
        })
    ]
};
