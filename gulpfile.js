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
    rename = require("gulp-rename"),
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
var pagesPath = pathCfg.pages;
var versionPath = pathCfg.version;

var sassFile = path.join(pagesPath, '/**/*.scss');
var cssFile = path.join(pagesPath, '/**/*.css');
var htmlFile = path.join(pagesPath, '/**/*.tpl');
var jsFile = path.join(pagesPath, '/**/*/index.js');
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
 * @description 替换src下子模板 *.tpl，生成的html页面放在当前目录下
 * 用于模版的include
 */
gulp.task('html', function(done) {
    return gulp.src([htmlFile])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: path.join(pagesPath)
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest(devPath))
        .pipe(connect.reload());
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
 * 依赖 sass
 * 压缩 css
 * copy css file
 * prd 环境生成版本号
 */
gulp.task('mincss', ['sass'], function(done) {
    var cssDestPath = path.join(buildPath, '/pages');

    return gulp.src(cssFile)
        //压缩
        .pipe(minifyCss({
            compatibility: 'ie7'
        }))
        // 版本号
        // .pipe(gulpif(config.env, rev()))
        .pipe(rev())
        .pipe(gulp.dest(cssDestPath))
        // 版本号map
        // .pipe(gulpif(config.env, rev.manifest()))
        .pipe(rev.manifest())
        .pipe(gulp.dest(versionPath));
});

/**
 * watch
 */
gulp.task('watch', function(done) {
    gulp.watch(sassFile, ['sass']);
    gulp.watch(htmlFile, ['html']);
    gulp.watch(jsFile, ['buildjs']);
});

//=====================================================================




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
