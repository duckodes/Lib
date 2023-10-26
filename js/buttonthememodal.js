function b_SwB(a = true, bW = "40px", cW = "20px", bH = "20px", cH = "20px",
    bC = "#ccc", bCOn = "#ccc", cC = "#aaa", cCOn = "#aaa", bR = "15px", cR = "15px", ls = document.body) {
    var b = d_SD(bW, bH, bC, bR, ls);
    var bRect = b.getBoundingClientRect();
    b.style.cursor = "pointer";
    b.style.transition = "all 0.5s ease";
    var c = d_SD(cW, cH, cC, cR, b);
    c.style.position = "relative";
    c.style.left = 0 + 'px';
    c.style.transition = "all 0.2s ease";

    var active = a;
    if (!active) {
        c.style.left = 0 + 'px';
        c.style.background = cC;
        b.style.background = bC;
        vs2015();
    }
    else if (active) {
        c.style.left = c.offsetWidth + 'px';
        c.style.background = cCOn;
        b.style.background = bCOn;
        tokyonightdark();
    }

    b.addEventListener("mousedown", () => {
        if (!active) {
            c.style.left = c.offsetWidth + 'px';
            c.style.background = cCOn;
            b.style.background = bCOn;
            active = true;
            tokyonightdark();
        }
        else if (active) {
            c.style.left = 0 + 'px';
            c.style.background = cC;
            b.style.background = bC;
            active = false;
            vs2015();
        }
    });
}
function d_SD(w, h, b, r, p) {
    var d = document.createElement("div");

    d.style.width = w;
    d.style.height = h;
    d.style.background = b;
    d.style.borderRadius = r;
    d.style.userSelect = "none";

    p.appendChild(d);

    return d;
}

function tokyonightdark() {
    var linkstyle = document.getElementById("code-style");
    linkstyle.href = "css/tokyo-night-dark.min.css";
}
function vs2015() {
    var linkstyle = document.getElementById("code-style");
    linkstyle.href = "css/vs2015.min.css";
}

var tb = document.getElementById("theme-button");
b_SwB(a = true, bW = "40px", cW = "20px", bH = "20px", cH = "20px",
    bC = "#633", bCOn = "#336", cC = "#855", cCOn = "#558", bR = "15px", cR = "15px", ls = tb);