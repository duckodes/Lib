/**
 * [Reference]
 * 
 * [Daily.html](../Daily.html)
 * 
 * [Introduction.html](../Introduction.html)
 * 
 * [main.html](../main.html)
 * 
 * [Portfolio.html](../Portfolio.html)
 * 
 * @version 1.1.0
 */
var motionbackground = (function () {
    return {
        initsnow: initsnow
    };
    function initsnow() {
        var symbols = ["❆", "❅", "❀"];

        function createsnow() {
            var b = document.createElement("span");
            var ri = Math.floor(Math.random() * symbols.length);

            b.innerHTML = symbols[ri];
            b.className = "snowflake";
            b.style.left = Math.random() * (window.innerWidth - 75) + "px";
            b.style.animationDuration = Math.random() * 3 + 10 + "s";
            b.style.fontSize = Math.random() * 20 + 20 + "px";
            b.style.transform = "rotate(" + Math.random() * 360 + "deg)";

            document.body.appendChild(b);

            setTimeout(function () {
                b.style.opacity = "0";
                setTimeout(function () {
                    b.remove();
                }, 1000);
            }, 10000);
        }

        setInterval(function () {
            createsnow();
        }, 1500);
    }
}());