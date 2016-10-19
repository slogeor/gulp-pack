/**
 * @description 实现全等功能，一是+0不等于-0，二是NaN等于自身
 * @eg: Object.is(-0, +0) ===> false
 * @eg: Object.is(NaN, NaN) ===> true
 */
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});