import fs from "fs";
import prompt from "prompt";

export default function(callback) {
    let _CONFIG = arguments[0];

    if (_CONFIG._APP && fs.existsSync(_CONFIG._DIR_APP)) {
        return callback(null, true);
    } else {
        prompt.start();
        prompt.get([{
            name: "Do you want to create an app? [Y/n]".white.bgBlue,
            validator: /^(y(es)?|n(o)?)?$/i
        }], (err, res) => {
            var res = !res[0] || res[0].match(/^(y(es)?)?$/i) ? true : false;
            if (res) {
                prompt.get([{
                    name: "App Name".white.bgBlue,
                    validator: /^([a-z0-9\_]+)$/i
                }], (err, res) => {

                });
            } else {
                return callback(true);
            }
        });
    }
}
