/**
 * [Reference]
 * 
 * []()
 * 
 * @version 1.1.0
 */
var consoleoutput = (function () {
    return {
        init: init
    };
    function init() {
        console_SwB(a = true, bW = "100%", cW = "10px", bH = "5px", cH = "10px",
            bC = "rgb(250, 100, 100, 0.5)", bCOn = "rgb(100, 150, 100, 0)", cC = "#222222", cCOn = "#222222", bR = "0px", cR = "5px", ls = document.body);
    }
    function consoleoutput(state) {
        var consoleOutput = document.createElement("code");
        consoleOutput.className = "console-output";
        consoleOutput.id = "resizableY"
        consoleOutput.style.position = "fixed";
        consoleOutput.style.bottom = "0";
        consoleOutput.style.right = "0%";
        consoleOutput.style.width = "100%";
        consoleOutput.style.height = "80%";
        consoleOutput.style.zIndex = "-999";
        consoleOutput.style.backgroundColor = "#111";
        consoleOutput.style.overflow = "auto";
        consoleOutput.style.userSelect = "none";
        consoleOutput.style.borderRadius = "10px";
        consoleOutput.style.opacity = "0.3";
        consoleOutput.style.resize = "both";
        document.body.appendChild(consoleOutput);
        resizeY("resizableY");
        scrollMDY("resizableY");

        var xhrFullRes = false;

        console.log = function (message) {
            consoleOutput.innerHTML += "<span style='color: white;'>" + message + "</span><br>";
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
            console.log('');
            if (xhrFullRes) {
                // 使用 AJAX 请求获取错误来源文件的内容
                var xhr = new XMLHttpRequest();
                xhr.open("GET", source, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var sourceCode = xhr.responseText;
                        var sourceLines = sourceCode.split('\n');

                        console.log('錯誤來源內容：');
                        for (var i = 0; i < sourceLines.length; i++) {
                            if (i === lineno - 1) {
                                var errorLine = sourceLines[i];
                                var errorColumn = colno - 1; // 列号从0开始

                                console.log('');
                                console.warn('行 [' + lineno + '] ' + errorLine);
                                console.log(' '.repeat(errorColumn) + '^'); // 在错误位置添加 ^ 符号
                            } else {
                                console.log('行 [' + (i + 1) + '] ' + sourceLines[i]);
                            }
                        }
                    }
                };
                xhr.send();
            }
            else {
                // 使用 AJAX 请求获取错误来源文件的内容
                var xhr = new XMLHttpRequest();
                xhr.open("GET", source, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var sourceLines = xhr.responseText.split('\n'); // 按行拆分源代码

                        if (sourceLines[lineno - 1]) {
                            var errorLine = sourceLines[lineno - 1];
                            var errorColumn = colno - 1; // 列号从0开始

                            console.log('錯誤來源內容：');
                            console.log('行 ' + lineno + ': ' + errorLine);
                            console.log(' '.repeat(errorColumn) + '^'); // 在错误位置添加 ^ 符号
                        }
                    }
                };
                xhr.send();
            }
            console.log('');
            window.scrollTo({
                top: window.document.body.scrollHeight,
                behavior: 'smooth'
            });
            consoleOutput.scrollTo({
                top: consoleOutput.scrollHeight,
                behavior: 'smooth'
            });
            return false;
        };
        var removebutton = document.createElement("div");
        removebutton.className = "console-output-rb";
        removebutton.innerText = "clear";
        removebutton.style.position = "fixed";
        removebutton.style.bottom = "5px";
        removebutton.style.width = "45px";
        removebutton.style.textAlign = "center";
        removebutton.style.right = "5px";
        removebutton.style.color = "white";
        removebutton.style.cursor = "pointer";
        removebutton.style.zIndex = "99999";
        document.body.appendChild(removebutton);
        removebutton.addEventListener("click", () => {
            consoleOutput.innerHTML = "";
        });
        var checkIndex = document.createElement("input");
        checkIndex.className = "console-output-ci";
        checkIndex.type = "checkbox";
        checkIndex.style.position = "fixed";
        checkIndex.style.bottom = "30px";
        checkIndex.style.textAlign = "right";
        checkIndex.style.right = "5px";
        checkIndex.style.zIndex = "99999";
        document.body.appendChild(checkIndex);
        checkIndex.addEventListener("change", () => {
            if (checkIndex.checked) {
                consoleOutput.style.zIndex = "9999";
                consoleOutput.style.opacity = "1";
            }
            else {
                consoleOutput.style.zIndex = "-999";
                consoleOutput.style.opacity = "0.3";
            }
        });
        var checkfullxhr = document.createElement("input");
        checkfullxhr.className = "console-output-ci";
        checkfullxhr.type = "checkbox";
        checkfullxhr.style.position = "fixed";
        checkfullxhr.style.bottom = "50px";
        checkfullxhr.style.textAlign = "right";
        checkfullxhr.style.right = "5px";
        checkfullxhr.style.zIndex = "99999";
        document.body.appendChild(checkfullxhr);
        checkfullxhr.addEventListener("change", () => {
            if (checkfullxhr.checked) {
                xhrFullRes = true;
            }
            else {
                xhrFullRes = false;
            }
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
            var allconsolecI = document.querySelectorAll('.console-output-ci');
            allconsolecI.forEach(function (element) {
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
        b.style.zIndex = "99999";
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
    function resizeY(id) {
        const resizableDiv = document.getElementById(id);
        let isResizing = false;
        let initialHeight;

        resizableDiv.addEventListener('mousedown', (e) => {
            const topEdge = resizableDiv.getBoundingClientRect().top;
            const mouseY = e.clientY;

            if (mouseY <= topEdge + 20) { // Adjust the threshold as needed
                isResizing = true;
                initialHeight = resizableDiv.clientHeight;
                const startY = e.clientY;

                document.addEventListener('mousemove', (e) => {
                    if (!isResizing) return;
                    const newHeight = initialHeight - (e.clientY - startY);
                    resizableDiv.style.height = newHeight + 'px';
                    resizableDiv.style.minHeight = "5%";
                    resizableDiv.style.maxHeight = "90%"
                });

                document.addEventListener('mouseup', () => {
                    isResizing = false;
                });
            }
        });
        resizableDiv.addEventListener('mousemove', (e) => {
            const topEdge = resizableDiv.getBoundingClientRect().top;
            const mouseY = e.clientY;

            if (mouseY <= topEdge + 20) { // Adjust the threshold as needed
                resizableDiv.style.cursor = "ns-resize";
            }
            else {
                resizableDiv.style.cursor = "";
            }
        });
    }
    function scrollMDY(id) {
        const scrollContainer = document.getElementById(id);

        let isScrolling = false;
        let startY = 0;
        let startScrollTop = 0;

        scrollContainer.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                isScrolling = true;
                startY = e.clientY;
                startScrollTop = scrollContainer.scrollTop;
            }
        });

        document.addEventListener("mouseup", () => {
            isScrolling = false;
        });

        document.addEventListener("mousemove", (e) => {
            if (isScrolling) {
                const deltaY = e.clientY - startY;
                scrollContainer.scrollTop = startScrollTop - deltaY;
            }
        });
    }
    function scrollMDYlerp(id) {
        const scrollContainer = document.getElementById(id);

        let isScrolling = false;
        let startY = 0;
        let startScrollTop = 0;
        let deltaY = 0;
        let inertiaInterval;

        scrollContainer.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                isScrolling = true;
                startY = e.clientY;
                startScrollTop = scrollContainer.scrollTop;

                clearInterval(inertiaInterval);
            }
        });

        document.addEventListener("mouseup", () => {
            if (isScrolling) {
                isScrolling = false;

                inertiaInterval = setInterval(() => {
                    if (deltaY === 0) {
                        clearInterval(inertiaInterval);
                    } else {
                        scrollContainer.scrollTop -= deltaY; // Invert the direction here
                        deltaY *= 0.9; // Adjust this factor for desired inertia effect
                    }
                }, 10);
            }
        });

        document.addEventListener("mousemove", (e) => {
            if (isScrolling) {
                deltaY = e.clientY - startY;
                scrollContainer.scrollTop = startScrollTop - deltaY;
            }
        });
    }
}());