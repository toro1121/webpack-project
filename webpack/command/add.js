var prompt = require('prompt');

module.exports = function(callback) {
    if (global._CONFIG._APP && fs.existsSync(_CONFIG._DIR_APP)) {
        return callback(null, true);
    } else {
        prompt.start();
        prompt.get([{
            name: 'Do you want to create an app? [Y/n]'.white.bgBlue,
            validator: /^(y(es)?|n(o)?)?$/i
        }], function(err, res) {
            var res = !res[0] || res[0].match(/^(y(es)?)?$/i) ? true : false;
            if (res) {
                prompt.get([{
                    name: 'App Name'.white.bgBlue,
                    validator: /^([a-z0-9\_]+)$/i
                }], function(err, res) {});
            } else {
                return callback(true);
            }
        });
    }
}
