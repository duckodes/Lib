/**
 * [Reference]
 * 
 * [Bomb.html](../Bomb.html)
 * 
 * @version 1.1.0
 */
var sliderutils = (function () {
    return {
        init: init
    };
    function init(v, min, max, s = "1") {
        var b = document.createElement("input");
        b.style.width = "100%";
        b.type = "range";
        b.value = v;
        b.min = min;
        b.max = max;
        b.step = s;
        return b;
    }
}());