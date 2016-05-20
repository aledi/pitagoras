'use strict';

var webpack = require('webpack');
var path = require('path');
var options = 'name=[path][name].[ext]&context=./src';
var include = [path.join(__dirname, 'src')];
var exclude = [path.join(__dirname, 'src', 'vendor')];
var config = require('config');
var defines = {config: JSON.stringify(config)};
var debug = process.argv.indexOf('-p') === -1;
var env = config.util.getEnv('NODE_ENV');

// Default plugins.
var plugins = [
    new webpack.DefinePlugin(defines)
];

// Create feature flags for all of our environments.
['localhost', 'development', 'beta', 'production'].forEach(function (environment) {
    defines[environment.toUpperCase()] = env === environment;
});

// Add non debug plugins.
if (!debug) {
    defines['process.env'] = {NODE_ENV: JSON.stringify('production')};

    plugins.push(
        new webpack.BannerPlugin('CONFIDENTIAL MATERIAL. DO NOT DISTRIBUTE.\nCopyright (c) ' + (new Date()).getFullYear() + ', Pitágoras. All Rights Reserved.'),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    );
}

module.exports = {
    bail: false,
    debug: debug,
    devtool: 'source-map',

    entry: [
        './src/pitagoras.jsx',
        './src/index.html'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'pitagoras.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {test: /\.jsx?$/, loader: (debug ? 'react-hot!babel?' : 'babel?') + JSON.stringify({presets: ['react', 'es2015']}), include: include, exclude: exclude},
            {test: /\.json$/, loader: 'json', include: include},
            {test: /\.scss$/, loader: 'style!css!postcss!sass', include: include},
            {test: /\.(ico|gif|png|jpe?g)$/, loader: 'file?' + options, include: include},
            {test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/, loader: 'file?' + options, include: include},

            {test: /\.html$/, loaders: [
                'file?' + options,
                'extract',
                'html?' + JSON.stringify({attrs: ['img:src', 'link:href']})
            ], include: include}
        ]
    },

    postcss: function () {
        return [require('autoprefixer')];
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: plugins
};
