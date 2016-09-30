/**
 * gulp: gulp插件
 * runSequence: 任务队列
 * path: node 路径
 * gutil: util 方法
 * os: 操作系统
 * gulpOpen: 打开指定URL
 * connect: liveReload
 * gulpif: if 判定
 * sass: sass编译
 * autoprefixer: 自动补全
 * minifyCSS: 压缩CSS
 * minifyHtml: 压缩HTML
 * uglify: 压缩混淆JS
 * rev: 版本号
 * revCollector: 添加版本号
 * fileInclude: 引入文件
 * clean: 清除文件
 * rename: 重命名
 * webpack: webapck插件
 * webpackConfig: webpack配置文件
 */
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    path = require('path'),
    gutil = require('gulp-util'),
    os = require('os'),
    gulpOpen = require('gulp-open'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    fileInclude = require('gulp-file-include'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

// webpack
var devConfig = Object.create(webpackConfig);
var devCompiler = webpack(devConfig);

//gulpfile 配置信息
var gulpConfig = require('./gulpfile.config.js');
var pathCfg = gulpConfig.pathCfg;
var host = gulpConfig.host;
var config = gulpConfig.config;

var bizDir = pathCfg.bizDir;
var pagesPath = pathCfg.pages;
var versionPath = pathCfg.version;
var devPath  = pathCfg.dev;
var buildPath = pathCfg.build;
var buildBizPath = path.join(buildPath, bizDir);
var devBizPath = path.join(devPath, bizDir);
var cssVerPath = path.join(versionPath, './css');
var jsVerPath = path.join(versionPath, './js');

var sassFile = path.join(pagesPath, '/**/*.scss');
var cssFile = path.join(pagesPath, '/**/*.css');
var tplFile = path.join(pagesPath, '/**/*.tpl');
var htmlFile = path.join(pagesPath, '/**/*.html');
var buildJsFile = path.join(pagesPath, '/**/*/index.js');
var jsFile = path.join(pagesPath, '/**/*.js');

/**
 * @description 选择打开浏览器
 * mac chrome: 'Google chrome',
 */
// var browser = os.platform() === 'linux' ? 'Google chrome' : (
//     os.platform() === 'darwin' ? 'Google chrome' : (
//         os.platform() === 'win32' ? 'chrome' : 'firefox'));

/**
 * @description  自动打开浏览器
 */
// gulp.task('open', function(done) {
//     var urlArr = [host.location + ':' +  host.port, host.defaultPath];
//     return gulp.src('')
//         .pipe(gulpOpen({
//             app: browser,
//             uri: urlArr.join('/')
//         }));
// });

/**
 * @default connect task
 */
// gulp.task('connectDev', function() {
//     return connect.server({
//         root: host.devPath,
//         port: host.port,
//         livereload: true
//     });
// });

// gulp.task('connectPrd', function() {
//     return connect.server({
//         root: host.prdPath,
//         port: host.port,
//         livereload: true
//     });
// });

/**
 * @default clean task
 */
// gulp.task('clean', function(done) {
//     return gulp.src([buildPath])
//         .pipe(clean({
//             force: true
//         }));
// });

/**
 * @description 替换src下子模板 *.tpl，生成的html页面放在当前目录下
 * 用于模版的include
 */
// gulp.task('html', function(done) {
//     return gulp.src([tplFile])
//         .pipe(fileInclude({
//             prefix: '@@',
//             basepath: path.join(pagesPath)
//         }))
//         .pipe(rename({
//             extname: '.html'
//         }))
//         .pipe(gulp.dest(devBizPath))
//         .pipe(connect.reload());
// });

/**
 * @description 编译sass，自动补前缀
 * sass和css在同一个目录下
 */
// gulp.task('sass', function(done) {
//     return gulp.src(sassFile)
//         .pipe(sass().on('error', sass.logError))
//         //自动补全
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false,
//             remove: false
//         }))
//         // css文件
//         .pipe(gulp.dest(devBizPath))
//         .pipe(connect.reload());
// });

/**
 * webpack对js编译
 */
gulp.task('buildjs', function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError('webpack:buildjs', err);
        gutil.log('[webpack:buildjs]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('js', ['buildjs'], function(done) {
    return gulp.src(jsFile)
        .pipe(connect.reload());
});

/**
 * 依赖 sass
 * 压缩 css
 * copy css file
 * prd 环境生成版本号
 */
// gulp.task('mincss', ['sass'] ,function(done) {
//     return gulp.src(cssFile)
//         //压缩
//         .pipe(minifyCss({
//             compatibility: 'ie7'
//         }))
//         // 版本号
//         // .pipe(gulpif(config.env, rev()))
//         .pipe(gulp.dest(buildBizPath))
//         .pipe(rev())
//         .pipe(gulp.dest(buildBizPath))
//         // 版本号map
//         // .pipe(gulpif(config.env, rev.manifest()))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest(cssVerPath));
// });

/**
 * 压缩混淆JS
 */
// gulp.task('minjs', ['buildjs'], function() {
//     return gulp.src(jsFile)
//         .pipe(uglify())
//         .pipe(gulp.dest(buildBizPath))
//         .pipe(rev())
//         .pipe(gulp.dest(buildBizPath))
//         // 版本号map
//         .pipe(rev.manifest())
//         .pipe(gulp.dest(jsVerPath));
// });

/**
 * 压缩 HTML
 * 引入 CSS JS 版本号
 */
// gulp.task('minhtml', ['html'], function() {
//     var cssVerFile = path.join(cssVerPath, './rev-manifest.json');
//     var jsVerFile = path.join(jsVerPath, './rev-manifest.json');

//     return gulp.src([cssVerFile, jsVerFile, htmlFile])
//         .pipe(revCollector())
//         .pipe(minifyHtml({
//             empty: true,
//             spare: true,
//             quotes: true
//         }))
//         .pipe(gulp.dest(buildBizPath));
// });

/**
 * watch
 */
gulp.task('watch', function(done) {
    gulp.watch(sassFile, ['sass']);
    gulp.watch(tplFile, ['html']);
    gulp.watch(jsFile, ['js']);
});

//dev
gulp.task('default', function(callback) {
    runSequence('html', 'sass', 'buildjs', ['connectDev', 'open', 'watch'],
        callback);
});

gulp.task('public', function(callback) {
    runSequence('clean', 'mincss', 'minjs', 'minhtml', ['connectPrd', 'open'],
        callback);
});
