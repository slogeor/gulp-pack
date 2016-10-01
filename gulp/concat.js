'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    gulp.task('concat', function () {
        var common = gulpConfig.common;
        return gulp.src(common.cssLibFile)
            .pipe(plugins.concat(common.cssLibIndex))
            .pipe(gulp.dest('./'));
    });
};
