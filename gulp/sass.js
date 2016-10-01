'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    gulp.task('sass', function (done) {
        var common = gulpConfig.common;
        var srcRoot = common.srcRoot;
        return gulp.src([common.sassFile, common.excludeSassFile])
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            //自动补全
            .pipe(plugins.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
                remove: false
            }))
            // css文件
            .pipe(gulp.dest(srcRoot))
            .pipe(plugins.connect.reload());
    });
};
