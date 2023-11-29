/**
 * [Reference]
 * 
 * [+Data.html](../+Data.html)
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
var buttonutils = (function () {
    'use strict';

    return {
        sd: sd,
        swb: swb
    };
    function sd(sw, sh, sb, sbdr, p) {
        var de = document.createElement("div");

        de.style.width = sw;
        de.style.height = sh;
        de.style.background = sb;
        de.style.borderRadius = sbdr;
        de.style.userSelect = "none";

        p.appendChild(de);

        return de;
    }
    /** @param fc ( atv ) */
    function swb({ a = false, bsw = "40px", csw = "20px", bsh = "20px", csh = "20px", bsbdr = "15px", csbdr = "15px", fs = 5,
        bsb = "#ccc", bsba = "#ccc", csb = "#aaa", csba = "#aaa", p = document.body, fc }) {
        var b = sd(bsw, bsh, bsb, bsbdr, p);
        var bRect = b.getBoundingClientRect();
        b.style.cursor = "pointer";
        b.style.transition = "all 0.5s ease";
        var c = sd(csw, csh, csb, csbdr, b);
        c.style.position = "relative";
        c.style.left = 0 + fs + 'px';
        c.style.top = b.offsetHeight / 2 - c.offsetHeight / 2 + 'px';
        c.style.transition = "all 0.2s ease";
        c.style.pointerEvents = "none";

        var atv = a;
        if (!atv) {
            c.style.left = 0 + fs + 'px';
            c.style.background = csb;
            b.style.background = bsb;
        }
        else if (atv) {
            c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
            c.style.background = csba;
            b.style.background = bsba;
        }
        fc(atv);

        var md = false;
        var mm = false;
        b.addEventListener("click", () => {
            if (!mm) {
                if (!atv) {
                    c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
                    c.style.background = csba;
                    b.style.background = bsba;
                    atv = true;
                    fc(atv);
                }
                else if (atv) {
                    c.style.left = 0 + fs + 'px';
                    c.style.background = csb;
                    b.style.background = bsb;
                    atv = false;
                    fc(atv);
                }
            }
        });
        b.addEventListener("mousedown", (e) => {
            md = true;
            var xPos = e.clientX - bRect.left - (c.offsetWidth / 2);
            if (xPos < 0) {
                xPos = 0 + fs;
            }
            if (xPos + c.offsetWidth > b.offsetWidth) {
                xPos = b.offsetWidth - c.offsetWidth - fs;
            }
            c.style.left = xPos + 'px';
        });
        document.addEventListener("mousemove", (e) => {
            if (md) {
                var xPos = e.clientX - bRect.left - (c.offsetWidth / 2);
                if (xPos < 0) {
                    xPos = 0 + fs;
                }
                if (xPos + c.offsetWidth > b.offsetWidth) {
                    xPos = b.offsetWidth - c.offsetWidth - fs;
                }
                c.style.left = xPos + 'px';
                mm = true;
            }
        });
        document.addEventListener("mouseup", (e) => {
            md = false;
            setTimeout(() => {
                mm = false;
            }, 500);
            if (mm) {
                var xPos = e.clientX - bRect.left - (c.offsetWidth / 2);
                if (xPos > b.offsetWidth / 2 - c.offsetWidth / 2) {
                    c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
                    c.style.background = csba;
                    b.style.background = bsba;
                    atv = true;
                    fc(atv);
                }
                else {
                    c.style.left = 0 + fs + 'px';
                    c.style.background = csb;
                    b.style.background = bsb;
                    atv = false;
                    fc(atv);
                }
            }
        });
        b.addEventListener("touchstart", function (e) {
            md = true;
            var xPos = e.touches[0].clientX - bRect.left - (c.offsetWidth / 2);
            if (xPos < 0) {
                xPos = 0 + fs;
            }
            if (xPos + c.offsetWidth > b.offsetWidth) {
                xPos = b.offsetWidth - c.offsetWidth - fs;
            }
            c.style.left = xPos + 'px';
        });
        document.addEventListener("touchmove", function (e) {
            if (md) {
                var xPos = e.touches[0].clientX - bRect.left - (c.offsetWidth / 2);
                if (xPos < 0) {
                    xPos = 0 + fs;
                }
                if (xPos + c.offsetWidth > b.offsetWidth) {
                    xPos = b.offsetWidth - c.offsetWidth - fs;
                }
                c.style.left = xPos + 'px';
                mm = true;
            }
        });
        document.addEventListener("touchend", function (e) {
            md = false;
            setTimeout(() => {
                mm = false;
            }, 500);
            if (mm) {
                var xPos = e.changedTouches[0].clientX - bRect.left - (c.offsetWidth / 2);
                if (xPos > b.offsetWidth / 2 - c.offsetWidth / 2) {
                    c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
                    c.style.background = csba;
                    b.style.background = bsba;
                    atv = true;
                    fc(atv);
                }
                else {
                    c.style.left = 0 + fs + 'px';
                    c.style.background = csb;
                    b.style.background = bsb;
                    atv = false;
                    fc(atv);
                }
            }
        });
    }
}());
