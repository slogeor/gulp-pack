var path = require('path');
var config = require('./enrty.config.js');

function generateEntry (param)  {
    var result = {};
    for (var i = 0; i < param.length; i++) {
        var value = param[i];
        var key = path.join(value, 'dist/index');
        result[key] = value;
    }
    return result;
}

module.exports = generateEntry(config);
