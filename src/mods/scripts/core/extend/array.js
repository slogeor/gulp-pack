var extendArray = {

    /**
     * @description 将类对象转为真正的数组
     * @eg: [].slice.call(arrayLike)
     */
    toArray: function () {
        return Array.from ? Array.from : function(obj) {
            return [].slice.call(obj);
        };
    },

    /**
     * @description 用于将一组值，转换为数组
     * @eg: ArrayOf(3) ==> [3]
     */
    ArrayOf: function () {
        return [].slice.call(arguments);
    },

    /**
     * @description 某个数组是否包含给定的值
     * @return {[type]} [description]
     * @eg: contains(["foo", "bar"], "bar") ==> true
     */
    contains: function () {
        return Array.prototype.includes ? function(arr, value) {
            return arr.includes(value);
        } : function(arr, value) {
            return arr.some(function(el) {
                return el === value;
            });
        };
    }
};