'use strict';

module.exports = {
    deps: [''],
    task: function server(gulp) {
        var gulpOpen = require('gulp-open');
        var os = require('os');
        var gulpConfig = require('../gulpfile.config.js');
        var host = gulpConfig.host;

        var browser = os.platform() === 'linux' ? 'Google chrome' : (
            os.platform() === 'darwin' ? 'Google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));

        var urlArr = [host.location + ':' +  host.port, host.defaultPath];

        return gulp.src('').pipe(gulpOpen({app: browser, uri: urlArr.join('/')}));
    }
};
