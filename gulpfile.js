var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var gulpConfig = require('./gulpfile.config.js');
var gulpTaskList = fs.readdirSync(path.join('./gulp/'));

gulpTaskList.forEach(function (taskfile) {
    var suffix = taskfile.split('.').pop();
    if (suffix === 'js') { // 过滤其它文件
        require('./gulp/' + taskfile)(gulp, gulpConfig, plugins);
    }
});


gulp.task('default', function(callback) {
    runSequence('html', 'sass', 'buildjs', ['connect', 'open'],
        callback);
});
