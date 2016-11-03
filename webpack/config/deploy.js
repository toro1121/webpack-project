import fs from "fs";
import cp from "child_process";
import Webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

import common from "../common";
let _COMMON = new common();
import base from "./base";

export default function() {
    let _CONFIG = arguments[0];
    let o = base(_CONFIG);

    o.output.path = _CONFIG._DIR_OUTPUT;

    if (fs.existsSync(_CONFIG._DIR_APP + "/js/common.js")) {
        o.entry.common.push(_CONFIG._DIR_APP + "/js/common");
    }

    o.module.loaders.push({
        test: /\.(sa|sc|c)ss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass", {
            publicPath: "../"
        }),
        exclude: [
            new RegExp(_CONFIG._DIR_NODE),
            new RegExp(_CONFIG._DIR_BOWER),
            new RegExp(_CONFIG._DIR_VENDOR)
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
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                autoprefixer: {
                    browsers: ["last 10 versions"],
                    add: true
                },
                discardComments: { removeAll: true }
            },
            canPrint: true
        })
    );

    o.devtool = false;

    // add html template
    arguments[1].map((value) => {
        let name = value.split(/\./)[0];
        if (fs.existsSync(_CONFIG._DIR_APP + "/js/" + name + ".js")) {
            o.entry[name] = [_CONFIG._DIR_APP + "/js/" + name + ".js"];
        }
        // o.addVendor(name, "html", value, _CONFIG._DIR_APP + "/" + value);
        // o.plugins.push(
        //     new HtmlWebpackPlugin({
        //         filename: value,
        //         template: _CONFIG._DIR_APP + "/" + value,
        //     })
        // );
    });

    // remove exist dist folder.
    _COMMON.removeDir(_CONFIG._DIR_OUTPUT);

    // run webpack
    Webpack(o, (err, stats) => {
        if (err) {
            console.log("Error", err);
        } else {
            cp.exec("cp " + _CONFIG._DIR_APP + "/*.htm* " + _CONFIG._DIR_OUTPUT);
            console.log(stats.toString({
                chunks: false,
                children: false,
                colors: _CONFIG._COLOR
            }));
        }
    });
};
