module.exports = {
    common: {
        srcRoot: './src',
        buildRoot: './build',
        // pages
        srcPagesPath: './src/pages',
        buildPagesPath: './build/pages',
        defaultPath: './pages/home',
        // sass、css
        sassFile: './src/**/*.scss',
        excludeSassFile: '!./src/mods/styles/scss/**/*.scss',
        cssFile: './src/**/*.css',
        jsFile: './src/**/*.js',
        cssLibFile: './src/mods/styles/css/lib/*.css',
        cssLibIndex: './src/mods/styles/css/index.css',
        cssLib: './src/mods/styles/css',
        // tpl、html
        tplFile: './**/*.tpl',
        excludeTplFile: '!./src/mods/views/**/*.tpl',
        htmlFile: './src/pages/**/*.html',
        // version
        cssVerPath: './src/version/css',
        jsVerPath: './src/version/js',
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
