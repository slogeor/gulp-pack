'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var path = require('path');
    var common = gulpConfig.common;
    var srcRoot = common.srcRoot;
    var pagesTplFile = common.pagesTplFile;

    gulp.task('html', function (done) {
        return gulp.src([pagesTplFile])
            .pipe(plugins.fileInclude({
                prefix: '@@',
                basepath: path.join(srcRoot)
            }))
            .pipe(plugins.rename({
                extname: '.html'
            }))
            .pipe(gulp.dest(srcRoot))
            .pipe(plugins.connect.reload());
    });
};
