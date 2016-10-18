'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var path = require('path');
    var common = gulpConfig.common;
    var tplFile = common.tplFile;
    var excludeTplFile = common.excludeTplFile;
    var prefixUrl = gulpConfig.host.online;

    gulp.task('html', function (done) {
        return gulp.src([tplFile, excludeTplFile])
            .pipe(plugins.fileInclude({
                prefix: '@@',
                basepath: path.join(common.srcRoot)
            }))
            .pipe(plugins.rename({
                extname: '.html'
            }))
            .pipe(plugins.prefix(prefixUrl, null, '{{'))
            .pipe(gulp.dest('./'))
            .pipe(plugins.connect.reload());
    });
};
