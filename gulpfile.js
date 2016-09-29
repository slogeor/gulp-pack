var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');

for (var task in tasks) {
    if (tasks.hasOwnProperty(task)) {
        gulp.task(task, tasks[task]['deps'] || [], (function (gulp, tasks, task) {
            tasks[task]['task'](gulp);
            // return function () {
                // return tasks[task]['task'](gulp);
            // };
        })(gulp, tasks, task));
    }
}

gulp.task('default', function () {
    gulp.run('server');
});
