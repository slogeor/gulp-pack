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
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

// webpack
var devConfig = Object.create(webpackConfig);
var devCompiler = webpack(devConfig);
//gulpfile 配置信息
var gulpConfig = require('./gulpfile.config.js');
var pathCfg = gulpConfig.pathCfg;
var host = gulpConfig.host;
var buildPath = pathCfg.build;
var devPath  = pathCfg.dev;
var sassFile = path.join(devPath, '/**/*.scss');
var htmlFile = path.join(devPath, '/**/*.html');
/**
 * @description 选择打开浏览器
 * mac chrome: "Google chrome", 
 */
var browser = os.platform() === 'linux' ? 'Google chrome' : (
    os.platform() === 'darwin' ? 'Google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));

/**
 * @description  自动打开浏览器
 */
gulp.task('open', function(done) {
    var urlArr = [host.location + ':' +  host.port, host.defaultPath];
    return gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: urlArr.join('/')
        }));
});

/**
 * @default connect task
 */
gulp.task('connect', function() {
    return connect.server({
        root: host.basePath,
        port: host.port,
        livereload: true
    });
});

/**
 * @default clean task
 */
gulp.task('clean', function(done) {
    return gulp.src([buildPath])
        .pipe(clean({
            force: true
        }));
});

/**
 * @description 编译sass，自动补前缀
 * sass和css在同一个目录下
 */
gulp.task('sass', function(done) {
    return gulp.src(sassFile)
        .pipe(sass().on('error', sass.logError))
        //自动补全
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false
        }))
        // css文件
        .pipe(gulp.dest(devPath));
});

/**
 * webpack对js编译
 */
gulp.task("buildjs", function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:buildjs", err);
        gutil.log("[webpack:buildjs]", stats.toString({
            colors: true
        }));
        callback();
    });
});

/**
 * @description 替换src下子模板，生成的html页面放在build下
 * 用于模版的include
 */
gulp.task('html', function(done) {
    return gulp.src([htmlFile])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: path.join(devPath)
        }))
        .pipe(gulp.dest(buildPath))
        .pipe(connect.reload());
});

/**
 * watch
 */
gulp.task('watch', function(done) {
    gulp.watch(sassFile, ['sass']);
    gulp.watch(htmlFile, ['html']);
});

//=====================================================================

/**
 * 依赖 sass
 * 压缩 css
 * copy css file
 * prd 环境生成版本号
 */
gulp.task('mincss', ['sass'], function(done) {
    var cssDevFile = path.join(pathCfg.devPath, pathCfg.cssFile);
    var cssDestPath = path.join(pathCfg.prdPath, pathCfg.cssPath);
    var cssVerPath = cssDestPath;
    console.log('mincss task......');
    return gulp.src(cssDevFile)
        //压缩
        .pipe(minifyCss({
            compatibility: 'ie7'
        }))
        // 版本号
        .pipe(gulpif(config.env, rev()))
        .pipe(gulp.dest(cssDestPath))
        // 版本号map
        .pipe(gulpif(config.env, rev.manifest()))
        .pipe(gulp.dest(cssVerPath))
        .pipe(connect.reload());
});

/**
 * 压缩混淆JS
 */
gulp.task('minjs', ['buildjs'], function() {
    var jsPageFile = path.join(pathCfg.prdPath, pathCfg.jsPageFile);
    var jsPrdPath = path.join(pathCfg.prdPath, pathCfg.jsPagePath);
    var jsVerPath = jsPrdPath;
    console.log('minjs task......');
    return gulp.src(jsPageFile)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsPrdPath))
        // 版本号map
        .pipe(rev.manifest())
        .pipe(gulp.dest(jsVerPath));
});

/**
 * 压缩 HTML 
 * 引入 CSS JS 版本号
 */
gulp.task('minhtml', function() {
    var cssVerFile = path.join(pathCfg.prdPath, pathCfg.cssVerFile);
    var jsVerFile = path.join(pathCfg.prdPath, pathCfg.jsVerFile);
    var viewPrdFile = path.join(pathCfg.prdPath, pathCfg.viewPageFile);
    var viewPagePath = path.join(pathCfg.prdPath, pathCfg.viewPagePath);
    console.log('minhtml task......');
    return gulp.src([cssVerFile, jsVerFile, viewPrdFile])
        .pipe(revCollector())
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(viewPagePath));
});









//dev
gulp.task('default', function(callback) {
    runSequence('html', 'sass', 'buildjs', ['connect', 'open', 'watch'],
        callback);
});