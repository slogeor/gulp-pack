'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var common = gulpConfig.common;
    var buildRoot = common.buildRoot;

    gulp.task('mincss', ['sass'], function (done) {
        return gulp.src(common.cssFile)
            //压缩
            .pipe(plugins.minifyCss({
                compatibility: 'ie7'
            }))
            // copy
            .pipe(gulp.dest(buildRoot))
            // 版本号
            .pipe(plugins.rev())
            .pipe(gulp.dest(buildRoot))
            // 版本号map
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(common.cssVerPath));
    });

    gulp.task('minjs', ['buildjs'], function () {
        return gulp.src(common.jsFile)
            .pipe(plugins.uglify())
            .pipe(gulp.dest(buildRoot))
            .pipe(plugins.rev())
            .pipe(gulp.dest(buildRoot))
            // 版本号map
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(common.jsVerPath));
    });

    gulp.task('minhtml', ['html'], function () {
        return gulp.src([common.cssVersion, common.jsVersion, common.htmlFile])
            .pipe(plugins.revCollector())
            .pipe(plugins.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe(gulp.dest(common.buildPagesPath));
    });
};
