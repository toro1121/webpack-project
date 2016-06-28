var fs = require('fs'),
    colors = require('colors');

var _CONFIG = require('../config');

module.exports = function(callback) {
    var path = _CONFIG._DIR_BASE + '/app';
    fs.readdir(path, function(err, arr) {
        arr.map(function(value, key) {
            var app = path + '/' + value;
            if (fs.lstatSync(app).isDirectory()) {
                console.log(value + ': ' + app.grey);
            }
        });
    });
};
