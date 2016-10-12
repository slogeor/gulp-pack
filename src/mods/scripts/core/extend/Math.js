/**
 * @description Math.trunc方法用于去除一个数的小数部分，返回整数部分。
 * @return {[type]}   [description]
 * @eg: Math.trunc(12.3) ==> 12
 */
Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};

/**
 * @description 来判断一个数到底是正数、负数、还是零
 * @eg: Math.sign(-0) ==> -0
 */
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};

/**
 * @description 用于计算一个数的立方根
 * @eg: Math.cbrt('8') ==> 2
 */
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};