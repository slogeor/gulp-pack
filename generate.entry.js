var path = require('path');
var config = require('./enrty.config.js');
var gulpConfig = require('./gulpfile.config.js');

function generateEntry (param)  {
    var prefix = gulpConfig.pathCfg.pages;
    var result = {};
    for (var i = 0; i < param.length; i++) {
        var item = param[i];
        var value = path.join(prefix, item);
        var key = path.join(value, 'dist/index');
        result[key] = value;
    }
    return result;
}

module.exports = generateEntry(config);
