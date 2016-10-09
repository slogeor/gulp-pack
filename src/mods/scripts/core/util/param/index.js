/**
 * 获取url信息
 * @param  {string} url window.location
 * @return {object}
 */
function _queryParam(url) {
    var search = url.search.slice(1),
        hashValue = url.hash.slice(1),
        result = [],
        paramMap = {},
        hashMap = {};

    if (search) {
        result = search.split('&') || [];
    }

    // 解析search
    for (var i = 0, len = result.length; i < len; i++) {
        // 分割每一项
        var searchArr = result[i].split('=');
        // 存对象
        paramMap[searchArr[0]] = searchArr[1] || '';
    }

    // 解析hash
    if (hashValue) {
        var hashArr = hashValue.split('=');
        hashMap[hashArr[0]] = hashArr[1] || '';
    }

    return {
        /**
         * 获取url查询参数对象
         * @return {Object}
         */
        search: function () {
            return paramMap;
        },

        /**
         * 获取pathname
         * @return {string} 参数取值
         */
        getPathName: function () {
            return url.pathname;
        },

        /**
         * 获取hostname
         * @return {string} 参数取值
         */
        getHostName: function () {
            return url.hostname;
        },

        /**
         * 获取url
         * @return {string} 参数取值
         */
        getHref: function () {
            return url.href;
        },

        /**
         * 查询参数值
         * @param  {string} key 查询参数
         * @return {string} value 参数取值
         */
        param: function (key) {
            return paramMap.hasOwnProperty(key) ? paramMap[key] : '';
        },

        /**
         * 获取hash对象
         * @return  {Object}
         */
        hash: function () {
            return hashMap;
        },

        /**
         * 查询hash值
         * @param  key {string} 查询参数
         * @return {string} 参数取值
         */
        getHash: function (key) {
            return hashMap.hasOwnProperty(key) ? hashMap[key] : undefined;
        }
    };
}

window.GLOBAL.util.param = _queryParam(window.location);
