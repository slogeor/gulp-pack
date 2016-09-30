module.exports = {
    common: {
        // 源目录
        srcRoot: './src',
        buildRoot: './build',
        pagesHtmlPath: './build/pages',
        srcPages: './src/pages',
        defaultPath: './pages/home',
        pagesTplFile: './pages/**/*.tpl',
        pagesHtmlFile: './src/pages/**/*.html',
        pagesSassFile: './src/pages/**/*.sass',
        srcCssFile: './src/**/*.css',
        srcJSFile: './src/**/*.js',
        cssVerPath: './src/version/css',
        jsVerPath: './src/version/js',
        cssManifest: './src/version/css/rev-manifest.json',
        jsManifest: './src/version/js/rev-manifest.json',
    },

    host: {
        // 访问地址
        location: 'http://127.0.0.1',
        // 端口号
        port: 9000
    },

    evn: {

    }
};



