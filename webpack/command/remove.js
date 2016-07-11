import fs from "fs";

import _COMMON from "../common";

export default function(callback) {
    let _CONFIG = arguments[0];

    if (_CONFIG._APP && fs.existsSync(_CONFIG._DIR_APP)) {
        _COMMON.removeDir(_CONFIG._DIR_APP);
        console.log("Success remove!");
    } else {

    }
}
