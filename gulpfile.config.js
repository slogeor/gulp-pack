module.exports = {
    /**
     *  basePath: 访问资源的主目录
     *  port: 端口号
     *  defaultPath: 默认访问的路径
     */
    host: {
        location: 'http://127.0.0.1',
        devPath: 'src',
        prdPath: 'build',
        port: 9000,
        defaultPath: 'pages/home/'
    },

    /**
     *  dev: 开发目录
     *  build: 线上目录
     *  bizDir: 业务主目录
     *  pages: pages目录
     */
    pathCfg: {
        dev: './src/',
        build: './build/',
        bizDir: './pages',
        pages: './src/pages',
        version: './src/pages/version/',
    },

     /**
     *  env: 环境标识 {
     *    dev: 开发
     *    test: 测试
     *    prd: 线上
     *  }
     */
    config: {
        env: 'dev'
    }
};
