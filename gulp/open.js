'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var os = require('os');
    var host = gulpConfig.host;
    var common = gulpConfig.common;

    var browser = os.platform() === 'linux' ? 'Google chrome' : (
        os.platform() === 'darwin' ? 'Google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));

    gulp.task('open', function (done) {
        var urlArr = [host.location + ':' + host.port, common.defaultPath].join('/');
        return gulp.src('')
            .pipe(plugins.open({
                app: browser,
                uri: urlArr
            }));
    });
};
