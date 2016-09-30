'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var common = gulpConfig.common;
    gulp.task('watch', function (done) {
        gulp.watch(common.sassFile, ['sass']);
        gulp.watch(common.tplFile, ['html']);
        gulp.watch(common.jsFile, ['js']);
    });
};
