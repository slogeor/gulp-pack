var date = {
    /**
     *   转成日期类型
     *   @param {number|string|date}  o 日期
     */
    toDate: function (o) {
        //判断是数字类型
        if (typeof (o) == "number") return new Date(o);
        //判断是字符串类型
        if (typeof (o) == "string") return new Date(o.replace(/-/g, "/"));

        //日期类型，去除时，分，秒
        if (avalon.type(o) === 'date') {
            return new Date(o.getFullYear(), o.getMonth(), o.getDate());
        } else {
            return new Date();
        }
    },

    /**
     *   增加日期
     *   @param {string| date} 日期
     *   @param {string} y:年， m：月，d：天
     *   @param {number}
     */
    addDate: function (o, type, num) {
        //转换成日期类型
        var date = D.toDate(o);
        var type = type.toLowerCase();

        switch (type) {
            case 'y':
                date.setFullYear(date.getFullYear() + num);
                break;
            case 'm':
                date.setMonth(date.getMonth() + num);
                break;
            case 'd':
                date.setDate(date.getDate() + num);
        }
        return date;
    },

    /**
     *   计算两个日期之间相差的月份，包括两边界
     *   @param {number|string|date} from 开始时间 to 结束时间
     */
    monthDiff: function (from, to) {
        var months;
        //判断是否日期类型
        if (avalon.type(from) !== "date" || avalon.type(to) !== 'date') {
            from = D.toDate(from);
            to = D.toDate(to);
        }
        //计算相差月数
        months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
        //若 from<=to 时，+1表示加上边界值；from > to时，-1表示加上边界
        months = (months >= 0 ? months + 1 : months - 1);
        return months;
    },

    /**
     *   计算两个日期之间相差的天数，不包括边界值
     *   @param {number|string|date} from 开始时间 to 结束时间
     */
    dayDiff: function (from, to) {
        var days;
        //判断是否日期类型
        if (avalon.type(from) === "date" && avalon.type(to) === 'date') {
            days = (to.getTime() - from.getTime()) / 86400000;
        } else {
            //string&number类型需要先转成日期类型
            days = (D.toDate(to).getTime() - D.toDate(from).getTime()) / 86400000;
        }
        return days;
    },

    /**
     *   获取日期字符串
     *   @param {number|string|date, int}  dateStr 日期  days 增加的天数，不设置为0
     */
    getDateStr: function (dateStr, days) {
        return D.formatStr(D.addDays(D.toDate(dateStr), days || 0), 'YYYY-MM-DD');
    },
    /**
     *   日期格式化
     *   @param {number|string|date, int}  o 日期  formatString 格式化方式
     */

    formatStr: function (o, formatString) {
        //转换成日期类型
        var date = D.toDate(o);
        /*
         * eg:formatString="YYYY-MM-DD hh:mm:ss";
         */
        var _o = {
            "M+": date.getMonth() + 1,
            //month
            "D+": date.getDate(),
            //day
            "h+": date.getHours(),
            //hour
            "m+": date.getMinutes(),
            //minute
            "s+": date.getSeconds(),
            //second
            "q+": Math.floor((date.getMonth() + 3) / 3),
            //quarter
            "S": date.getMilliseconds() //millisecond
        };

        if (/(Y+)/.test(formatString)) {
            formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in _o) {
            if (new RegExp("(" + k + ")").test(formatString)) {
                formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? _o[k] : ("00" + _o[k]).substr(("" + _o[k]).length));
            }
        }
        return formatString;
    }
};

window.GLOBAL.util.date = date;
