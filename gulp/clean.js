'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var common = gulpConfig.common;
    gulp.task('clean', function (done) {
        return gulp.src(common.buildRoot)
            .pipe(plugins.clean({
                force: true
            }));
    });
};
