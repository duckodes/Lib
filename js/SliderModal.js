let value_slider = Number;
/**
 * slider modal
 * 
 * @param {number} sv - start value
 * @param {number} max - max value
 * @param {string} bW - base width
 * @param {string} cW - control handler  width
 * @param {string} bH - base height
 * @param {string} cH - control handler  height
 * @param {string} bC - base color
 * @param {string} cC - control handler color
 * @param {string} bR - base radius
 * @param {string} cR - control handler radius
 */
function s_sm(sv = 0, max = 100, bW = "100px", cW = "20px", bH = "10px", cH = "20px",
    bC = "#ccc", cC = "#aaa", bR = "15px", cR = "15px", parent = document.body) {
    var br = document.createElement("br");
    parent.appendChild(br);
    var b = d_SD(bW, bH, bC, bR, parent);
    var bRect = b.getBoundingClientRect();
    b.style.cursor = "pointer";
    b.style.zIndex = "999";
    var c = d_SD(cW, cH, cC, cR, b);
    c.style.position = "absolute";
    c.style.top = bRect.top - parseFloat(cH) / 2 + parseFloat(bH) / 2 + 'px';
    c.style.left = sv * ((parseFloat(bW) - 2) / max) - 1 + bRect.x + 'px';
    var v = d_SD(bH, bH, "rgba(0, 0, 0, 0)", "0", b);
    v.innerText = sv;
    v.style.width = "20%";
    v.style.position = "absolute";
    v.style.top = bRect.top - parseFloat(cH) / 2 + parseFloat(bH) / 2 - 1 + 'px';
    v.style.left = parseFloat(bW) + bRect.x - 160 + 'px';
    v.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    value_slider = sv;
    v.innerText = "地雷 " + parseInt(value_slider);
    var sD = false;
    b.addEventListener("mousedown", (e) => {
        sD = true;
        if (e.clientX < bRect.x + bRect.width &&
            e.clientX > bRect.x) {
            c.style.left = e.clientX - c.offsetWidth / 2 + 'px';
            value_slider = (parseFloat(c.style.left) - bRect.x + 9) / ((parseFloat(bW) - 2) / max);
            v.innerText = "地雷 " + parseInt(value_slider);
        }
    });
    document.addEventListener("mousemove", (e) => {
        if (sD &&
            e.clientX < bRect.x + bRect.width &&
            e.clientX > bRect.x) {
            c.style.left = e.clientX - c.offsetWidth / 2 + 'px';
            value_slider = (parseFloat(c.style.left) - bRect.x + 9) / ((parseFloat(bW) - 2) / max);
            v.innerText = "地雷 " + parseInt(value_slider);
        }
    });
    document.addEventListener("mouseup", () => {
        if (sD) {
            sD = false;
        }
    });
    return b;
}
/**
 * create solid div
 *
 * @param {width} w - width
 * @param {height} h - height
 * @param {background} b - background
 * @param {borderRadius} r - border radius
 * @param {Element} p - element parent
 * @returns - div element (defined simply)
 */
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
function gvs_0() {
    return parseInt(value_slider);
}