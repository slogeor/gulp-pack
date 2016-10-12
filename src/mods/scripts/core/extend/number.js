(function(global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });

    var global_isNaN = global.isNaN;

    Object.defineProperty(Number, 'isNaN', {
        value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });

    var floor = Math.floor,
        isFinite = global.isFinite;

    Object.defineProperty(Number, 'isInteger', {
        value: function isInteger(value) {
            return typeof value === 'number' && isFinite(value) &&
                value > -9007199254740992 && value < 9007199254740992 &&
                floor(value) === value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);
