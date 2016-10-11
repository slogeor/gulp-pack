var parser = {
    /**
     * @description 取接口返回数据中某个字段的值
     * @param {object} obj 接口数据
     * @param {string} paramLink 层级关系用.连接
     * @param defaultValue 类型填充
     * @eg: var obj = {item: {age: 12}}
     * @eg: getJsonValue(obj, item.sex, 'F') ==> 'F';
     * @eg: getJsonValue(obj, item.age, '18') ==> '12';
     */
    getJsonValue: function (obj, paramLink, defaultValue) {
        if (!paramLink) {
            return;
        }
        var param = paramLink.split('.');

        var objectChecked = angular.extend({}, obj);

        for (var i = 0, len = param.length; i < len; i++) {
            if (objectChecked && objectChecked.hasOwnProperty(param[i])) {
                objectChecked = objectChecked[param[i]];
            } else {
                if (defaultValue === false || defaultValue === 0) {
                    return defaultValue;
                }

                return defaultValue || undefined;
            }
        }
        return objectChecked;
    },

    /**
     * @description 生成uuid
     * @return string
     * @eg: getUuid(); ==> 05ot2yrxxh0g3colowgz51b5kg
     */
    getUuid: function () {
        //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },

    /**
     * @description 转换int类型的字符串，数字中间每个三个加上',' 分隔符可以自定义
     * @eg: formartNumber('14245',',') ==>  '14,245'
     */
    formartNumber: function (val, placeholder) {
        var str = placeholder || ',';

        var value = String(val);

        var result = '';
        var l = value.length;
        var i;
        for (i = l - 1; i >= 0; i--) {
            result = value[i] + result;
            if ((l - 1 - i) % 3 === 2 && i !== 0) {
                result = str + result;
            }
        }
        return result;
    },

    /**
     * @description 截取字符串
     * @param  {[string]} target
     * @param  {[number]} length
     * @param  {[string]} truncation
     * eg: truncate('abcdefghig', 5, '...') ==> "abcde..."
     */
    truncate: function (target, length, truncation) {
        var len = length || 30;
        var truncationStr = !truncation ? '...' : truncation;
        return target.length > len ? target.slice(0, len) + truncationStr : String(target);
    },

    /**
     * @description 字符串转义
     * eg: let str = '/path/to/resource.html?search=query';
     * eg: escapeRegExp(str) ==> \/path\/to\/resource\.html\?search=query
     */
    escapeRegExp: function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
};

window.GLOBAL.util.parser = parser;
