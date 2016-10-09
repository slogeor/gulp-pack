
// 获取cookie对象
function _readCookie() {
    return document.cookie;
}

/**
 *   获取cookie集合
 */
function _getCookieHash() {
    var cookieArr = _cookie.split(";");
    var cookieHash = {};
    for (var i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].indexOf("=") != -1)
            cookieHash[cookieArr[i].split("=")[0].replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")] = unescape(cookieArr[i].split("=")[1]).replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
    }
    return cookieHash;
}

var _cookie = _readCookie();

var _cookieHash = _getCookieHash();

var ck = GLOBAL.util.cookie = {
    /**
     * 获取cookie信息
     */
    oStr: _cookie,

    /**
     *   重新获取cookie信息
     */
    read: function() {
        ck.oStr = _readCookie();
    },

    /**
     *   设置cookie信息
     *   @param {string,string,string,string,string} sName 名称 sValue 值 dExpire 过期时间 sDomain 所在域 sPath 路径
     */
    setCookie: function(sName, sValue, dExpire, sDomain, sPath) {
        var _cookieString = sName + "=" + escape(sValue);
        if (dExpire) _cookieString += "; expires=" + dExpire.toGMTString();
        if (sDomain) _cookieString += "; domain=" + sDomain;
        if (sPath) _cookieString += "; path=" + sPath;
        document.cookie = _cookieString;
        ck.refresh();
    },
    /**
     *   删除cookie值
     *   @param {string} sName 名称
     */
    deleteCookie: function(sName) {
        var _date = new Date(1);
        document.cookie = sName + "=;expires=" + _date.toGMTString();
        ck.refresh();
    },
    /**
     *   刷新cookie值
     */
    refresh: function() {
        ck.read();
        ck.values = _getCookieHash();
    },

    /**
     * 获取cookie的值
     * @param  {string} key
     * @return {string}
     */
    getCookie: function(key) {
        return _cookieHash[key];
    }
};

//初始化设置
ck.values = _cookieHash;
