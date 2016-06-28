var fs = require('fs');

var _CONFIG = require('../config'),
    _COMMON = require('../common');

module.exports = function(callback) {
    if (global._CONFIG._APP && fs.existsSync(_CONFIG._DIR_APP)) {
        _COMMON.removeDir(_CONFIG._DIR_APP);
        console.log('Success remove!');
    } else {

    }
}
