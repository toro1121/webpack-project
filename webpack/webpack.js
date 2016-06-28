#! /usr/bin/env node

var argv = require('optimist').argv,
    async = require('async'),
    fs = require('fs'),
    cp = require('child_process'),
    colors = require('colors');

var _CONFIG, _COMMON;

/*
TODO:
1. auto build data construct
2. add HTML file don't restart project
*/
async.auto({
        step1: function(callback) {
            // default setting
            var _HOST = 'localhost';
            var _PORT = '8888';
            if (argv.host) {
                _HOST = argv.host;
            }
            if (argv.H) {
                _HOST = argv.H;
            }
            if (argv.port) {
                _PORT = argv.port;
            }
            if (argv.P) {
                _PORT = argv.P;
            }
            global._CONFIG = {
                _TYPE: argv['_'][0] ? argv['_'][0] : false,
                _APP: argv['_'][1] ? argv['_'][1] : false,
                _HOST: _HOST,
                _PORT: _PORT,
                _COLOR: argv.color === false ? argv.color : true
            };

            _CONFIG = require('./config');
            _COMMON = require('./common');

            var command = ['add', 'remove', 'rm', 'list', 'ls', 'develop', 'deploy'];
            if (!argv['_'][0] || !command.indexOf(argv['_'][0])) {
                return callback(true);
            }
            if (argv.h || argv.help) {
                return callback(true);
            }

            callback(null, true);
        },
        step2: ['step1', function(callback) {
            if (global._CONFIG._APP && fs.existsSync(_CONFIG._DIR_APP)) {
                var html = _COMMON.findFile(_CONFIG._DIR_APP, /\.htm(l)?$/);
                var compass = _COMMON.findFile(_CONFIG._DIR_APP, /^config.rb$/);

                setTimeout(function() {
                    if (html.length) {
                        callback(null, {
                            config: './config/' + global._CONFIG._TYPE + '.js',
                            html: html,
                            compass: compass.length ? true : false
                        });
                    } else {
                        callback(2);
                    }
                }, 100);
            } else if (/^l(i)?s(t)?$/.test(global._CONFIG._TYPE)) {
                callback(null, {});
            } else {
                callback(1);
            }
        }],
        step3: ['step2', function(callback, result) {
            var res = result.step2;
            switch (true) {
                case /^add$/.test(global._CONFIG._TYPE):
                    require('./command/list')(callback);
                    break;
                case /^r(e)?m(ove)?$/.test(global._CONFIG._TYPE):
                    require('./command/list')(callback);
                    break;
                case /^l(i)?s(t)?$/.test(global._CONFIG._TYPE):
                    require('./command/list')(callback);
                    break;
                case /^develop$/.test(global._CONFIG._TYPE):
                    // compass watch
                    if (res.compass) {
                        cp.spawn('compass', [
                            'watch',
                            '-q',
                            '--force',
                            '--boring',
                            _CONFIG._DIR_APP
                        ], {});
                    }
                    require(res.config)(res.html, res.compass);
                    break;
                case /^deploy$/.test(global._CONFIG._TYPE):
                    if (res.compass) {
                        cp.spawn('compass', [
                            'compile',
                            '-q',
                            '--force',
                            '--boring',
                            _CONFIG._DIR_APP
                        ], {});
                    }
                    require(res.config)(res.html, res.compass);
                    break;
            }
        }]
    },
    function(err, result) {
        // error message
        var msg = null;
        switch (err) {
            case 1:
                msg = 'No such app directory.';
                break;
            case 2:
                msg = 'Dosen\'t has any HTML file in app folder.';
                break;
            case 3:
                msg = 'This app already existed. Please choise an else app name.'
                break;
            case 4:
                break;
            default:
        }
        if (msg) {
            console.log(msg.bgRed);
            console.log();
        }

        // help information
        require('./help.js')();
    }
);
