import assign from "object-assign";
import async from "async";
import { argv } from "optimist";
import colors from "colors";
import cp from "child_process";
import fs from "fs";

import config from "./config";
import common from "./common";

import list from "./command/list";
import help from "./help";
import develop from "./config/develop";
import deploy from "./config/deploy";

let _CONFIG = config();
let _COMMON = new common();

/*
TODO:
1. auto build data construct
2. add HTML file don"t restart project
*/
async.auto({
        step1: (callback) => {
            // default setting
            let _HOST = "localhost";
            let _PORT = "8888";
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
            _CONFIG = config({
                _ENV: argv["_"][0] ? argv["_"][0] : false,
                _APP: argv["_"][1] ? argv["_"][1] : false,
                _HOST: _HOST,
                _PORT: _PORT,
                _COLOR: argv.color === false ? argv.color : true
            });

            let command = ["add", "remove", "rm", "list", "ls", "develop", "deploy"];
            if (!argv["_"][0] || !command.indexOf(argv["_"][0])) {
                return callback(true);
            }
            if (argv.h || argv.help) {
                return callback(true);
            }

            callback(null, true);
        },
        step2: ["step1", (callback) => {
            if (_CONFIG._APP && fs.existsSync(_CONFIG._DIR_APP)) {
                let html = _COMMON.findFile(_CONFIG._DIR_APP, /\.htm(l)?$/);
                let compass = _COMMON.findFile(_CONFIG._DIR_APP, /^config.rb$/);

                setTimeout(() => {
                    if (html.length) {
                        callback(null, {
                            config: "./config/" + _CONFIG._ENV + ".js",
                            html: html,
                            compass: compass.length ? true : false
                        });
                    } else {
                        callback(2);
                    }
                }, 100);
            } else if (/^l(i)?s(t)?$/.test(_CONFIG._ENV)) {
                callback(null, {});
            } else {
                callback(1);
            }
        }],
        step3: ["step2", (callback, result) => {
            let res = result.step2;
            switch (true) {
                case /^add$/.test(_CONFIG._ENV):
                case /^r(e)?m(ove)?$/.test(_CONFIG._ENV):
                case /^l(i)?s(t)?$/.test(_CONFIG._ENV):
                    return list(callback);
                    break;
                case /^develop$/.test(_CONFIG._ENV):
                    // compass watch
                    if (res.compass) {
                        cp.spawn("compass", [
                            "watch",
                            "-q",
                            "--force",
                            "--boring",
                            _CONFIG._DIR_APP
                        ], {});
                    }
                    return develop(_CONFIG, res.html, res.compass);
                    break;
                case /^deploy$/.test(_CONFIG._ENV):
                    if (res.compass) {
                        cp.spawn("compass", [
                            "compile",
                            "-q",
                            "--force",
                            "--boring",
                            _CONFIG._DIR_APP
                        ], {});
                    }
                    return deploy(_CONFIG, res.html, res.compass);
                    break;
            }
        }]
    },
    (err, result) => {
        // error message
        var msg = null;
        switch (err) {
            case 1:
                msg = "No such app directory.";
                break;
            case 2:
                msg = "Dosen\"t has any HTML file in app folder.";
                break;
            case 3:
                msg = "This app already existed. Please choise an else app name."
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
        help();
    }
);
