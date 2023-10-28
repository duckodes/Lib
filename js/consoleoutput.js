function consoleswitch() {
    console_SwB(a = true, bW = "100%", cW = "10px", bH = "5px", cH = "10px",
        bC = "rgb(250, 100, 100, 0.5)", bCOn = "rgb(100, 150, 100, 0)", cC = "#222222", cCOn = "#222222", bR = "0px", cR = "5px", ls = document.body);
}
function consoleoutput(state) {
    var consoleOutput = document.createElement("div");
    consoleOutput.className = "console-output";
    consoleOutput.style.width = "50%";
    consoleOutput.style.position = "relative";
    consoleOutput.style.left = "25%";
    consoleOutput.style.marginLeft = "10%";
    document.body.appendChild(consoleOutput);

    console.log = function (message) {
        consoleOutput.innerHTML += "<span style='color: white;'>[Log] " + message + "</span><br>";
    };
    console.error = function (message) {
        consoleOutput.innerHTML += "<span style='color: red;'>[Error] " + message + "</span><br>";
    };

    console.warn = function (message) {
        consoleOutput.innerHTML += "<span style='color: orange;'>[Warning] " + message + "</span><br>";
    };

    console.info = function (message) {
        consoleOutput.innerHTML += "<span style='color: blue;'>[Info] " + message + "</span><br>";
    };
    window.onerror = function (message, source, lineno, colno, error) {
        console.error('錯誤訊息：' + message);
        console.error('來源：' + source);
        console.error('行號：' + lineno);
        console.error('列號：' + colno);
        console.error('錯誤對象：' + error);
        window.scrollTo({
            top: window.document.body.scrollHeight,
            behavior: 'smooth'
        });
    };
    var removebutton = document.createElement("div");
    removebutton.className = "console-output-rb";
    removebutton.innerText = "clear";
    removebutton.style.position = "fixed";
    removebutton.style.bottom = "5px";
    removebutton.style.width = "45px";
    removebutton.style.textAlign = "right";
    removebutton.style.right = "10px";
    removebutton.style.color = "white";
    removebutton.style.cursor = "pointer";
    document.body.appendChild(removebutton);
    removebutton.addEventListener("click", () => {
        consoleOutput.innerHTML = "";
    });
    if (!state) {
        var allconsole = document.querySelectorAll('.console-output');
        allconsole.forEach(function (element) {
            element.remove();
        });
        var allconsolerb = document.querySelectorAll('.console-output-rb');
        allconsolerb.forEach(function (element) {
            element.remove();
        });
    }
}

function console_SwB(a = true, bW = "40px", cW = "20px", bH = "20px", cH = "20px",
    bC = "#ccc", bCOn = "#ccc", cC = "#aaa", cCOn = "#aaa", bR = "15px", cR = "15px", ls = document.body) {
    var b = console_SD(bW, bH, bCOn, bR, ls);
    var bRect = b.getBoundingClientRect();
    b.style.transition = "all 3s ease-out";
    b.style.position = "fixed";
    b.style.bottom = "0";
    b.style.right = "-2px";
    b.style.zIndex = "9999";
    var c = console_SD(cW, cH, cCOn, cR, b);
    c.style.position = "relative";
    c.style.bottom = "3px";
    c.style.left = b.offsetWidth + 'px';
    c.style.transition = "all 5s ease-out";

    var active = a;
    if (!active) {
        c.style.left = -2 + 'px';
        c.style.background = cC;
        b.style.background = bC;
        consoleoutput(true);
    }
    else if (active) {
        c.style.left = (b.offsetWidth - 13) + 'px';
        c.style.background = cCOn;
        b.style.background = bCOn;
        consoleoutput(false);
    }

    b.addEventListener("mousedown", () => {
        if (!active) {
            c.style.left = (b.offsetWidth - 13) + 'px';
            c.style.background = cCOn;
            b.style.background = bCOn;
            active = true;
            consoleoutput(false);
        }
        else if (active) {
            c.style.left = -2 + 'px';
            c.style.background = cC;
            b.style.background = bC;
            active = false;
            consoleoutput(true);
        }
    });
}
function console_SD(w, h, b, r, p) {
    var d = document.createElement("div");

    d.style.width = w;
    d.style.height = h;
    d.style.background = b;
    d.style.borderRadius = r;
    d.style.userSelect = "none";

    p.appendChild(d);

    return d;
}