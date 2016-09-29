'use strict';

(function () {
    var toString = Object.prototype.toString;

    var isObject = function (factory) {
        return toString.call(factory) === '[object Object]';
    };

    var isFunction = function (factory) {
        return toString.call(factory) === '[object Function]';
    };

    /**
     * @descript 命名空间管理
     * @namespace GLOBAL
     */
    if (!isObject(window.GLOBAL)) {
        window.GLOBAL = {};
    }

    /**
     * 定义命名空间
     * @param namespaceStr {String} 命名空间字符串
     * @return {GLOBAL} 返回全局对象GLOBAL
     */
    window.GLOBAL.ns = function (namespaceStr) {
        var namespaceList = namespaceStr && namespaceStr.split('.') || [];
        var self = window.GLOBAL;

        for (var i = 0, len = namespaceList.length; i < len; i++) {
            self = self[namespaceList[i]] = self[namespaceList[i]] || {};
        }
        return self;
    };

    /**
     * 定义模块,默认挂在GLOBAL下
     * @param name {String} 名称
     * @param factory {Object|Function} 扩展对象或构造方法
     */
    window.GLOBAL.define = function (name, factory) {
        if (arguments.length < 2) {
            return;
        }

        /**
         * 命名空间存在且有属性
         */
        if (window.GLOBAL[name] && isObject(window.GLOBAL[name]) || isFunction(window.GLOBAL[name])) {
            throw new Error('该命名空间已存在,不允许覆盖');
        }

        /**
         * 向命名空间下挂
         */
        if (isFunction(factory)) {
            window.GLOBAL[name] = factory;
        }
    };
}());
