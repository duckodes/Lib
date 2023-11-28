/**
 * [Reference]
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * @version 1.0.0
 */
var liboption = (function () {
    return {
        init: init
    }
    function init() {
        var option = document.getElementById("option");

        option.addEventListener("click", () => {
            contextmenuutils.init(option.parentElement, (b, c) => {
                c.style.marginLeft = "-50px";
            });
            contextmenuutils.addItem("Settings", (c) => {
                c.addEventListener("click", () => {
                    alertutils.init(document.body, (b, c, ti, rmb) => {
                        b.style.background = "rgb(0, 0, 0, 0.3)";
                        ti.textContent = "⌥ Settings";
                        fileutils.ReadFileText('Resource/Register/localstorage.ordinary-level/8hR7kL3pQ9sT6wE2.localstorage', (text) => {
                            var bbtn = document.createElement("div");
                            bbtn.style.display = "flex";
                            bbtn.style.alignItems = "center";
                            bbtn.style.flexDirection = "row";
                            var btn = document.createElement("div");
                            btn.innerText = "主題";
                            btn.style.width = "70%";
                            c.appendChild(bbtn);
                            bbtn.appendChild(btn);
                            buttonutils.swb({
                                a: storageutils.get(text), bsw: "40px", csw: "14px", bsh: "20px", csh: "14px", bsbdr: "15px", csbdr: "15px", fs: 5,
                                bsb: "#777", bsba: "#336", csb: "#333", csba: "#558", p: bbtn, fc(atv) {
                                    storageutils.set(text, atv);
                                    if (atv) {
                                        themepackage.tokyonightdark("code-style");
                                    }
                                    else {
                                        themepackage.vs2015("code-style");
                                    }
                                }
                            });
                        });
                        fileutils.ReadFileText('Resource/Register/localstorage.ordinary-level/i9RL6x1tAAUC0rKwbveo.localstorage', (text) => {
                            var bbtn = document.createElement("div");
                            bbtn.style.display = "flex";
                            bbtn.style.alignItems = "center";
                            bbtn.style.flexDirection = "row";
                            var btn = document.createElement("div");
                            btn.innerText = "資源(A~Z)";
                            btn.style.width = "70%";
                            c.appendChild(bbtn);
                            bbtn.appendChild(btn);
                            buttonutils.swb({
                                a: storageutils.get(text), bsw: "40px", csw: "14px", bsh: "20px", csh: "14px", bsbdr: "15px", csbdr: "15px", fs: 5,
                                bsb: "#777", bsba: "#336", csb: "#333", csba: "#558", p: bbtn, fc(atv) {
                                    storageutils.set(text, atv);
                                    if (atv) {
                                        libsources.show();
                                    }
                                    else {
                                        libsources.hide();
                                    }
                                }
                            });
                        });
                        rmb.addEventListener("click", () => { document.body.style.overflow = ''; b.remove(); });
                    });
                    document.body.style.overflow = 'hidden';
                    contextmenuutils.remove();
                });
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#202020";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "";
                });
            });
            contextmenuutils.addItem("help", (c) => {
                c.addEventListener("click", () => {
                    alertutils.init(document.body, (b, c, ti, rmb) => {
                        ti.textContent = "help";
                        var ver = document.createElement("span");
                        ver.innerText = "ver.1.0.0";
                        c.appendChild(ver);
                        rmb.addEventListener("click", () => { b.remove(); });
                        window.onclick = function (event) {
                            if (event.target === b) {
                                b.remove();
                        }}
                    });
                    contextmenuutils.remove();
                });
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#202020";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "";
                });
            });
            contextmenuutils.addItem("..", (c) => {
                c.addEventListener("click", () => {
                    c.innerText = "paint";
                    if(c.innerText === "paint"){
                        c.addEventListener("click", () => {
                            window.location.href = "Paint.html";
                        });
                    }
                    contextmenuutils.addItem("svg Paint", (c) => {
                        c.addEventListener("click", () => {
                            window.location.href = "SvgPaint.html";
                        });
                        c.addEventListener("mouseenter", () => {
                            c.style.background = "#202020";
                        });
                        c.addEventListener("mouseleave", () => {
                            c.style.background = "";
                        });
                    });
                    contextmenuutils.addItem("upload daily", (c) => {
                        c.addEventListener("click", () => {
                            window.location.href = "+Data.html";
                        });
                        c.addEventListener("mouseenter", () => {
                            c.style.background = "#202020";
                        });
                        c.addEventListener("mouseleave", () => {
                            c.style.background = "";
                        });
                    });
                });
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#202020";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "";
                });
            });
            
        });
    }
}());
liboption.init();