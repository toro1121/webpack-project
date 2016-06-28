var path = require('path');

var baseDir = path.resolve(__dirname, '../');

// TODO:
module.exports = {
    _DEV: global._CONFIG._TYPE,
    _HOST: global._CONFIG._HOST,
    _PORT: global._CONFIG._PORT,

    _APP: global._CONFIG._APP,

    _DIR_BASE: baseDir,
    _DIR_APP: baseDir + '/app' + (global._CONFIG._APP ? '/' + global._CONFIG._APP : ''),
    _DIR_NODE: baseDir + '/node_modules',
    _DIR_BOWER: baseDir + '/bower_components',

    _FILE_LIMIT: 500
};
