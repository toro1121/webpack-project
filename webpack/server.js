import util from "util";
import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

export default function() {
    let _CONFIG = arguments[0].config;

    new WebpackDevServer(Webpack(arguments[0]), {
        contentBase: _CONFIG._DIR_APP,
        hot: true,
        inline: true,
        quiet: true,
        noInfo: false,
        lazy: false,
        historyApiFallback: true,
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // },
        stats: {
            version: true,
            timings: true,
            chunks: false,
            children: false,
            cached: false,
            cachedAssets: false,
            colors: _CONFIG._COLOR,
        }
    }).listen(_CONFIG._PORT, _CONFIG._HOST, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log("Listening as " + util.format("http://%s:%d", _CONFIG._HOST, _CONFIG._PORT));
    });
};
