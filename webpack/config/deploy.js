var fs = require('fs'),
    cp = require('child_process'),

    Webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),

    _CONFIG = require('../config'),
    _COMMON = require('../common'),
    o = require('./base');

module.exports = function() {
    o.output.path = _CONFIG._DIR_BASE + '/dist';

    if (fs.existsSync(_CONFIG._DIR_APP + '/js/common.js')) {
        o.entry.common.push(_CONFIG._DIR_APP + '/js/common');
    }

    o.module.loaders.push({
        test: /\.(sa|sc|c)ss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass', {
            publicPath: '../'
        }),
        include: [
            new RegExp(_CONFIG._DIR_APP + '/sass'),
            new RegExp(_CONFIG._DIR_APP + '/css')
        ]
    });

    o.plugins.push(
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            // TODO: mangle
            mangle: false,
            output: { comments: false },
            compress: {
                warnings: false
            }
        }),
        new Webpack.optimize.DedupePlugin(),
        new Webpack.NoErrorsPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.(sa|sc|c)ss$/,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                autoprefixer: {
                    browsers: ['last 10 versions'],
                    add: true
                },
                discardComments: { removeAll: true }
            },
            canPrint: true
        })
    );

    o.devtool = false;

    // add html template
    arguments[0].map(function(value) {
        var name = value.split(/\./)[0];
        if (fs.existsSync(_CONFIG._DIR_APP + '/js/' + name + '.js')) {
            o.entry[name] = [_CONFIG._DIR_APP + '/js/' + name + '.js'];
        }
        o.addVendor(name, 'html', value, _CONFIG._DIR_APP + '/' + value);
        // o.plugins.push(
        //     new HtmlWebpackPlugin({
        //         filename: value,
        //         template: _CONFIG._DIR_APP + '/' + value,
        //     })
        // );
    });

    // remove exist dist folder.
    _COMMON.removeDir(_CONFIG._DIR_BASE + '/dist');

    // run webpack
    Webpack(o, function(err, stats) {
        if (err) {
            console.log('Error', err);
        } else {
            cp.exec('cp ' + _CONFIG._DIR_APP + '/*.htm* ' + _CONFIG._DIR_BASE + '/dist');
            console.log(stats.toString({
                chunks: false,
                children: false,
                colors: global._CONFIG._COLOR
            }));
        }
    });
};
