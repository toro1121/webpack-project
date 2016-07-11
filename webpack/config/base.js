import fs from "fs";
import Webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default function() {
    let _CONFIG = arguments[0];

    return {
        config: _CONFIG,
        context: _CONFIG._DIR_APP,
        entry: {
            common: []
        },
        output: {
            path: "/",
            publicPath: "./",
            filename: "js/[name].js"
        },
        resolve: {
            alias: {},
            extensions: ["", ".js", ".jsx", ".css", ".scss", ".sass"]
        },
        module: {
            noParse: [],
            loaders: [
                // html
                {
                    test: /\.htm(l)?$/,
                    loader: "html"
                },
                // css
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style", "css", {
                        publicPath: "../"
                    }),
                    include: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER),
                        new RegExp(_CONFIG._DIR_VENDOR)
                    ]
                },
                // js
                {
                    test: /\.jsx?$/,
                    loader: "react-hot!babel?presets[]=es2015&presets[]=react",
                    exclude: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER)
                    ]
                },
                // image
                {
                    test: /\.(png|jpe?g|gif|svg)(\?\w*)?/,
                    loader: "url",
                    include: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER),
                        new RegExp(_CONFIG._DIR_VENDOR)
                    ],
                    query: {
                        limit: _CONFIG._FILE_LIMIT,
                        name: "vendor/img/[name].[ext]"
                    }
                }, {
                    test: /\.(png|jpe?g|gif|svg)(\?\w*)?/,
                    loader: "url",
                    exclude: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER),
                        new RegExp(_CONFIG._DIR_VENDOR)
                    ],
                    query: {
                        limit: _CONFIG._FILE_LIMIT,
                        name: "[path]/[name].[ext]"
                    }
                },
                // font
                {
                    test: /\.(woff2?|[t|o]tf)(\?\w*)?/,
                    loader: "url",
                    include: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER),
                        new RegExp(_CONFIG._DIR_VENDOR)
                    ],
                    query: {
                        limit: _CONFIG._FILE_LIMIT,
                        name: "vendor/font/[name].[ext]"
                    }
                },
                // 修正IE字型問題
                {
                    test: /\.eot(\?\w*)?/,
                    loader: "url",
                    include: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER),
                        new RegExp(_CONFIG._DIR_VENDOR)
                    ],
                    query: {
                        limit: 9999999999
                    }
                }, {
                    test: /\.(woff2?|[t|o]tf|eot)(\?\w*)?/,
                    loader: "url",
                    exclude: [
                        new RegExp(_CONFIG._DIR_NODE),
                        new RegExp(_CONFIG._DIR_BOWER),
                        new RegExp(_CONFIG._DIR_VENDOR)
                    ],
                    query: {
                        limit: _CONFIG._FILE_LIMIT,
                        name: "[path]/[name].[ext]"
                    }
                }
            ]
        },
        plugins: [
            new Webpack.DefinePlugin({
                _CONFIG: JSON.stringify(_CONFIG)
            }),
            new Webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "root.jQuery": "jquery"
            }),
            new Webpack.optimize.CommonsChunkPlugin({
                name: "common",
                filename: "js/common.js",
                selectedChunks: Infinity
            }),
            new ExtractTextPlugin("css/[name].css")
        ],
        profile: true,
        cache: true,
        // watch: true,
        debug: true,
        devtool: "source-map",

        //add vendor
        addVendor: function(entry, fileType, name, path) {
            this.resolve.alias[name] = path;
            // this.module.noParse.push(new RegExp("^" + name + "$"));
            // this.module.noParse.push(new RegExp(name + "$"));
            //js自動加入entry.vender
            // if (fileType === "js") {
            if (this.entry[entry]) {
                this.entry[entry].push(name);
            } else {
                this.entry[entry] = name;
            }
            // }
        }
    };
};
