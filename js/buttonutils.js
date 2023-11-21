var buttonutils = (function () {
    'use strict';

    return {
        sd: sd,
        swb: swb
    };
    function sd(w, h, b, r, p) {
        var d = document.createElement("div");

        d.style.width = w;
        d.style.height = h;
        d.style.background = b;
        d.style.borderRadius = r;
        d.style.userSelect = "none";

        p.appendChild(d);

        return d;
    }
    function swb({ a = false, bW = "40px", cW = "20px", bH = "20px", cH = "20px", bR = "15px", cR = "15px", fs = 5,
        bC = "#ccc", bCOn = "#ccc", cC = "#aaa", cCOn = "#aaa", ls = document.body, fc }) {
        var b = sd(bW, bH, bC, bR, ls);
        var bRect = b.getBoundingClientRect();
        b.style.cursor = "pointer";
        b.style.transition = "all 0.5s ease";
        var c = sd(cW, cH, cC, cR, b);
        c.style.position = "relative";
        c.style.left = 0 + fs + 'px';
        c.style.top = b.offsetHeight / 2 - c.offsetHeight / 2 + 'px';
        c.style.transition = "all 0.2s ease";
        c.style.pointerEvents = "none";

        var active = a;
        if (!active) {
            c.style.left = 0 + fs + 'px';
            c.style.background = cC;
            b.style.background = bC;
        }
        else if (active) {
            c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
            c.style.background = cCOn;
            b.style.background = bCOn;
        }
        fc(active);

        var md = false;
        var mm = false;
        b.addEventListener("click", () => {
            if (!mm) {
                if (!active) {
                    c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
                    c.style.background = cCOn;
                    b.style.background = bCOn;
                    active = true;
                    fc(active);
                }
                else if (active) {
                    c.style.left = 0 + fs + 'px';
                    c.style.background = cC;
                    b.style.background = bC;
                    active = false;
                    fc(active);
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
                    c.style.background = cCOn;
                    b.style.background = bCOn;
                    active = true;
                    fc(active);
                }
                else {
                    c.style.left = 0 + fs + 'px';
                    c.style.background = cC;
                    b.style.background = bC;
                    active = false;
                    fc(active);
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
                var xPos = event.changedTouches[0].clientX - bRect.left - (c.offsetWidth / 2);
                if (xPos > b.offsetWidth / 2 - c.offsetWidth / 2) {
                    c.style.left = b.offsetWidth - c.offsetWidth - fs + 'px';
                    c.style.background = cCOn;
                    b.style.background = bCOn;
                    active = true;
                    fc(active);
                }
                else {
                    c.style.left = 0 + fs + 'px';
                    c.style.background = cC;
                    b.style.background = bC;
                    active = false;
                    fc(active);
                }
            }
        });
    }
}());
