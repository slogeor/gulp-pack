module.exports = {
    /**
     * host信息 {
     *  basePath: 访问资源的主目录
     *  port: 端口号
     *  defaultPath: 默认访问的路径
     * } 
     */
    host: {
        location: 'http://127.0.0.1',
        basePath: 'src',
        port: 9000,
        defaultPath: 'pages/home/'
    },
    /**
     * 环境配置 {
     *  tag: 环境标识 {dev: 开发; test: 测试; prd: 线上}
     * }
     * @type {Object}
     */
    env: {
        tag: 'dev'
    },

    /**
     * 路径信息 {
     *  dev: 开发目录
     *  build: 线上目录
     * }
     * 
     */
    pathCfg: {
        dev: './src/',
        build: './build/'
        // jsPagePath: 'scripts/pages/',
        // jsPageFile: 'scripts/pages/**/*.js',
        // viewPath: 'views/',
        // viewPagePath: 'views/pages/',
        // viewFile: 'views/**/*.html',
        // viewPageFile: 'views/pages/**/*.html',
        // cssVerFile: 'styles/**/*.json',
        // jsVerFile: 'scripts/**/*.json'
    }
};
