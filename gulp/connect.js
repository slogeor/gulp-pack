'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var host = gulpConfig.host;
    var common = gulpConfig.common;

    gulp.task('connect', function () {
        return plugins.connect.server({
            root: common.srcRoot,
            port: host.port,
            livereload: true
        });
    });
};
