/**
 * [Reference]
 * 
 * []()
 * 
 * @version 1.0.0
 */
var alertutils = (function () {
    return {
        init: init
    };
    function init(p, fc) {
        var b = document.createElement("div");
        b.style.position = "fixed";
        b.style.top = "0";
        b.style.left = "0";
        b.style.width = "100%";
        b.style.height = "100%";
        b.style.backgroundColor = "rgba(0,0,0,0.7)";
        b.style.userSelect = "none";
        b.style.zIndex = "999";
        b.style.justifyContent = "center";
        b.style.alignItems = "center";

        var c = document.createElement("div");
        c.style.backgroundColor = "#f4f4f4";
        c.style.padding = "20px";
        c.style.border = "1px solid #888";
        c.style.width = "auto";
        c.style.height = "auto";
        c.style.maxHeight = "80%";
        c.style.maxWidth = "80%";
        c.style.textAlign = "center";
        c.style.position = "relative";
        c.style.borderRadius = "10px";

        var rmb = document.createElement("span");
        rmb.innerHTML = "&times;";
        rmb.style.position = "absolute";
        rmb.style.top = "10px";
        rmb.style.right = "10px";
        rmb.style.border = "2px solid #353535";
        rmb.style.borderRadius = "5px";
        rmb.style.fontSize = "20px";
        rmb.style.fontWeight = "bold";
        rmb.style.cursor = "pointer";

        if (typeof fc === 'function') {
            fc(b, c, rmb);
        }

        p.appendChild(b);

        b.appendChild(c);

        c.appendChild(rmb);
    }
}());