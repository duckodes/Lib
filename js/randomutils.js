/**
 * [Reference]
 * 
 * []()
 * 
 * @version 1.1.0
 */
var randomutils = (function () {
    return {
        string: string,
        int: int,
        float: float
    };
    function string(l) {
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let r = '';
        for (let i = 0; i < l; i++) {
            r += char.charAt(Math.floor(Math.random() * char.length));
        }
        return r;
    }
    function int(min, max) {
        var ri = Math.floor(Math.random() * (max - min + 1)) + min;
        return ri;
    }
    function float(min, max) {
        var rn = Math.random() * (max - min + 1) + min;
        return rn;
    }
}());