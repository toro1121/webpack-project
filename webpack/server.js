var util = require('util'),
    Webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),

    _CONFIG = require('./config');

module.exports = function() {
    new WebpackDevServer(Webpack(arguments[0]), {
        contentBase: _CONFIG._DIR_APP,
        hot: true,
        inline: true,
        quite: false,
        noInfo: false,
        lazy: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        stats: {
            version: true,
            timings: true,
            chunks: false,
            children: false,
            cached: false,
            cachedAssets: false,
            colors: global._CONFIG._COLOR,
        }
    }).listen(_CONFIG._PORT, _CONFIG._HOST, function(err, res) {
        if (err) {
            console.log(err);
        }
        console.log('Listening as ' + util.format('http://%s:%d', _CONFIG._HOST, _CONFIG._PORT));
    });
};
