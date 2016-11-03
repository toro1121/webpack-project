import fs from "fs";
import util from "util";
import Webpack from "webpack";
import Dashboard from "webpack-dashboard";
import DashboardPlugin from "webpack-dashboard/plugin";

import base from "./base";
import server from "../server";


export default function() {
    let _CONFIG = arguments[0];
    let o = base(_CONFIG);

    o.output.publicPath = util.format("http://%s:%d/", _CONFIG._HOST, _CONFIG._PORT);

    if (fs.existsSync(_CONFIG._DIR_APP + "/js/common.js")) {
        o.entry.common.push(_CONFIG._DIR_APP + "/js/common");
    }

    // hot module replacement
    o.entry.common.push(util.format("webpack-dev-server/client?http://%s:%d", _CONFIG._HOST, _CONFIG._PORT));
    o.entry.common.push("webpack/hot/dev-server");

    let dashboard = new Dashboard();
    o.plugins.push(
        new Webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(dashboard.setData)
    );

    o.module.loaders.push({
        test: /\.s(a|c)ss$/,
        loader: "style!css?sourceMap!postcss!sass?sourceMap",
        exclude: [
            new RegExp(_CONFIG._DIR_NODE),
            new RegExp(_CONFIG._DIR_BOWER),
            new RegExp(_CONFIG._DIR_VENDOR)
        ]
    }, {
        test: /\.css$/,
        loader: "style!css?sourceMap!postcss",
        exclude: [
            new RegExp(_CONFIG._DIR_NODE),
            new RegExp(_CONFIG._DIR_BOWER),
            new RegExp(_CONFIG._DIR_VENDOR)
        ]
    });

    o.postcss = [
        require("autoprefixer")({
            browsers: ["last 10 versions"]
        })
    ];

    // add html template
    arguments[1].map((value) => {
        let name = value.split(/\./)[0];
        if (fs.existsSync(_CONFIG._DIR_APP + "/js/" + name + ".js")) {
            o.entry[name] = [_CONFIG._DIR_APP + "/js/" + name + ".js"];
        }
        o.addVendor(name, "html", value, _CONFIG._DIR_APP + "/" + value);
    });

    // run webpack-dev-server
    return server(o);
};
