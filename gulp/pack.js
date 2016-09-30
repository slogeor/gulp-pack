'use strict';

module.exports = function (gulp, gulpConfig, plugins) {
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config.js');
    var devConfig = Object.create(webpackConfig);
    var devCompiler = webpack(devConfig);
    gulp.task('buildjs', function (callback) {
        devCompiler.run(function (err, stats) {
            if (err) throw new plugins.util.PluginError('webpack:buildjs', err);
            plugins.util.log('[webpack:buildjs]', stats.toString({
                colors: true
            }));
            callback();
        });
    });

    // gulp.task('js', ['buildjs'], function (done) {
    //     return gulp.src(jsFile)
    //         .pipe(plugins.connect.reload());
    // });
};
