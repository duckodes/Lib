/**
 * [Portfolio.html](../Portfolio.html)
 * 
 * @version 1.0.0
 */
var linkprocessutils = (function () {
    return {
        isetlink: isetlink,
        csetlink: csetlink
    };
    function isetlink(id, url) {
        if (id !== null) {
            const i = document.getElementById(id);
            i.addEventListener("click", function () {
                window.location.href = url;
            });
        }
    }
    function csetlink(cls, url) {
        if (cls !== null) {
            const c = document.querySelector(cls);
            c.addEventListener("click", function () {
                window.location.href = url;
            });
        }
    }
}());