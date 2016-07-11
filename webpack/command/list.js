import fs from "fs";
import colors from "colors";

import config from "../config";

let _CONFIG = config();

export default function(callback) {
    let path = _CONFIG._DIR_BASE + "/app";
    fs.readdir(path, (err, arr) => {
        arr.map((value, key) => {
            let app = path + "/" + value;
            if (fs.lstatSync(app).isDirectory()) {
                console.log(value + ": " + app.grey);
            }
        });
    });
};
