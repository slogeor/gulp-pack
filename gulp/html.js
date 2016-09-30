'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var path = require('path');
    var common = gulpConfig.common;
    var tplFile = common.tplFile;
    var excludeTplFile = common.excludeTplFile;

    gulp.task('html', function (done) {
        return gulp.src([tplFile, excludeTplFile])
            .pipe(plugins.fileInclude({
                prefix: '@@',
                basepath: path.join(common.srcRoot)
            }))
            .pipe(plugins.rename({
                extname: '.html'
            }))
            .pipe(gulp.dest('./'))
            .pipe(plugins.connect.reload());
    });
};
