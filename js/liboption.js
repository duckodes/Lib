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
                    var alert = showAlert("Settings", "", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    buttonutils.swb({
                        a: false, bsw: "40px", csw: "14px", bsh: "20px", csh: "14px", bsbdr: "15px", csbdr: "15px", fs: 5,
                        bsb: "#777", bsba: "#336", csb: "#333", csba: "#558", p: alert.firstChild, fc(active) {
                            
                        }
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
            contextmenuutils.addItem("help", (c) => {
                c.addEventListener("click", () => {
                    contextmenuutils.remove();
                });
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#202020";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "";
                });
            });
            contextmenuutils.addItem("", (c) => {
                buttonutils.swb({
                    a: storageutils.get('active'), bsw: "40px", csw: "14px", bsh: "20px", csh: "14px", bsbdr: "15px", csbdr: "15px", fs: 5,
                    bsb: "#777", bsba: "#336", csb: "#333", csba: "#558", p: c, fc(active) {
                        storageutils.set('active', active);
                        if (active) {
                            themepackage.tokyonightdark("code-style");
                        }
                        else {
                            themepackage.vs2015("code-style");
                        }
                    }
                });
            });
        });
    }
}());
liboption.init();