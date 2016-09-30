module.exports = {
    common: {
        srcRoot: './src',
        buildRoot: './build',
        srcPagesPath: './src/pages',
        buildPagesPath: './build/pages',
        sassFile: './src/**/*.scss',
        excludeSassFile: '!./src/mods/styles/scss/**/*.scss',
        cssFile: './src/**/*.css',
        srcJSFile: './src/**/*.js',
        cssVerPath: './src/version/css',
        jsVerPath: './src/version/js',
        defaultPath: './pages/home',
        tplFile: './pages/**/*.tpl',
        htmlFile: './src/pages/**/*.html',
        cssVersion: './src/version/css/rev-manifest.json',
        jsVersion: './src/version/js/rev-manifest.json',
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



