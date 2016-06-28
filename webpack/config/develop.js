var util = require('util'),
    fs = require('fs'),
    Webpack = require('webpack'),

    _CONFIG = require('../config'),
    o = require('./base');

module.exports = function() {
    o.output.publicPath = util.format('http://%s:%d/', _CONFIG._HOST, _CONFIG._PORT);

    if (fs.existsSync(_CONFIG._DIR_APP + '/js/common.js')) {
        o.entry.common.push(_CONFIG._DIR_APP + '/js/common');
    }

    // hot module replacement
    o.entry.common.push(util.format('webpack-dev-server/client?http://%s:%d', _CONFIG._HOST, _CONFIG._PORT));
    o.entry.common.push('webpack/hot/dev-server');
    o.plugins.push(
        new Webpack.HotModuleReplacementPlugin()
    );

    o.module.loaders.push({
        test: /\.s(a|c)ss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap',
        include: [
            new RegExp(_CONFIG._DIR_APP + '/sass'),
            new RegExp(_CONFIG._DIR_APP + '/css')
        ]
    }, {
        test: /\.css$/,
        loader: 'style!css?sourceMap!postcss',
        include: [
            new RegExp(_CONFIG._DIR_APP + '/sass'),
            new RegExp(_CONFIG._DIR_APP + '/css')
        ]
    });

    o.postcss = [
        require('autoprefixer')({
            browsers: ['last 10 versions']
        })
    ];

    // add html template
    arguments[0].map(function(value) {
        var name = value.split(/\./)[0];
        if (fs.existsSync(_CONFIG._DIR_APP + '/js/' + name + '.js')) {
            o.entry[name] = [_CONFIG._DIR_APP + '/js/' + name + '.js'];
        }
        o.addVendor(name, 'html', value, _CONFIG._DIR_APP + '/' + value);
    });

    // run webpack-dev-server
    require('../server.js')(o);
};
