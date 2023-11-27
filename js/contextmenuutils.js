/**
 * [Reference]
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * [liboption.js](liboption.js)
 * 
 * @version 1.1.0
 */
var contextmenuutils = (function () {
    return {
        init: init,
        addItem: addItem,
        remove: remove
    };
    var atv = false;
    /** @param fc ( b, c ) */
    function init(p, fc) {
        if (!atv) {
            var b = document.createElement("div");
            b.id = "ins-contextmenu-base";
            b.style.position = "fixed";
            b.style.top = "0";
            b.style.left = "0";
            b.style.width = "100%";
            b.style.height = "100%";

            var c = document.createElement("div");
            c.id = "ins-contextmenu";
            c.style.color = "#fff";
            c.style.background = "#353535";
            c.style.borderRadius = "10px";
            c.style.position = "fixed";

            p.appendChild(b);
            p.appendChild(c);

            fc(b, c);

            window.onclick = function (e) {
                if (e.target === b) {
                    remove();
                }
            }

            atv = true;
        }
        else {
            remove();
        }
    }
    /** @param fc ( c ) */
    function addItem(t, fc) {
        if (atv) {
            var contextmenu = document.getElementById("ins-contextmenu");
            var c = document.createElement("div");
            c.innerText = t;
            c.style.marginTop = "5px";
            c.style.marginBottom = "5px";
            c.style.paddingTop = "5px";
            c.style.paddingBottom = "5px";
            c.style.paddingLeft = "10px";
            c.style.paddingRight = "10px";
            c.style.textAlign = "center";
            c.style.display = "flex";
            c.style.alignItems = "center";
            c.style.justifyContent = "center";
            c.style.cursor = "pointer";
            c.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
            contextmenu.appendChild(c);

            fc(c);
        }
    }
    function remove() {
        var b = document.getElementById("ins-contextmenu-base");
        var c = document.getElementById("ins-contextmenu");
        b.remove();
        c.remove();
        atv = false;
    }
}());