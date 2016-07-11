import assign from "object-assign";
import path from "path";

let baseDir = path.resolve(__dirname, "../");

export default function(config) {
    let _CONFIG = {
        _ENV: typeof config != "undefined" ? config._ENV : null,
        _HOST: typeof config != "undefined" ? config._HOST : null,
        _PORT: typeof config != "undefined" ? config._PORT : null,

        _APP: typeof config != "undefined" ? config._APP : null,

        _COLOR: typeof config != "undefined" ? config._COLOR : null,
    };

    _CONFIG = assign({}, _CONFIG, {
        _DIR_BASE: baseDir,
        _DIR_APP: baseDir + "/app" + (_CONFIG._APP ? "/" + _CONFIG._APP : ""),
        // _DIR_NODE: baseDir + "/node_modules",
        // _DIR_BOWER: baseDir + "/bower_components",
        _DIR_NODE: "node_modules",
        _DIR_BOWER: "bower_components",
        _DIR_VENDOR: "vendor",

        _FILE_LIMIT: 500
    });

    return _CONFIG;
}
