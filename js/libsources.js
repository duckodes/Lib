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
var libsources = (function () {
    return {
        init: init
    };
    function init() {
        var blacklibsources = document.querySelectorAll('.black-lib-sources');
        var whitelibsources = document.querySelectorAll('.white-lib-sources');
        blacklibsources.forEach(function (element) {
            element.addEventListener("click", function () {
                if (element.innerText === "A") {
                    var alert = showAlert("A", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var AudioCollectionlink = Alinker("◆AudioCollection", "UnityLibrary.html" + "?v=" + "AudioCollection");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(AudioCollectionlink);
                }
                if (element.innerText === "C") {
                    var alert = showAlert("C", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var Counterlink = Alinker("◆Counter", "UnityLibrary.html" + "?v=" + "Counter");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(Counterlink);
                }
                if (element.innerText === "E") {
                    var alert = showAlert("E", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "H") {
                    var alert = showAlert("H", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "J") {
                    var alert = showAlert("J", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "M") {
                    var alert = showAlert("M", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var MenuGenericlink = Alinker("◆MenuGeneric", "UnityLibrary.html" + "?v=" + "MenuGeneric");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(MenuGenericlink);
                }
                if (element.innerText === "O") {
                    var alert = showAlert("O", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "Q") {
                    var alert = showAlert("Q", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "T") {
                    var alert = showAlert("T", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var Timerlink = Alinker("◆Timer", "UnityLibrary.html" + "?v=" + "Timer");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(Timerlink);
                }
                if (element.innerText === "V") {
                    var alert = showAlert("V", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "Y") {
                    var alert = showAlert("Y", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
            });
        });
        whitelibsources.forEach(function (element) {
            element.addEventListener("click", function () {
                if (element.innerText === "B") {
                    var alert = showAlert("B", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "D") {
                    var alert = showAlert("D", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var DraggablePanellink = Alinker("◆DraggablePanel", "UnityLibrary.html" + "?v=" + "DraggablePanel");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(DraggablePanellink);
                }
                if (element.innerText === "F") {
                    var alert = showAlert("F", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "G") {
                    var alert = showAlert("G", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "I") {
                    var alert = showAlert("I", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var InitializationEventlink = Alinker("◆InitializationEvent", "UnityLibrary.html" + "?v=" + "InitializationEvent");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(InitializationEventlink);
                }
                if (element.innerText === "K") {
                    var alert = showAlert("K", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "L") {
                    var alert = showAlert("L", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "N") {
                    var alert = showAlert("N", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "P") {
                    var alert = showAlert("P", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "R") {
                    var alert = showAlert("R", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "S") {
                    var alert = showAlert("S", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var Seacherlink = Alinker("◆Searcher", "UnityLibrary.html" + "?v=" + "Searcher");
                    var exlink = Alinker("◆nextex", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(Seacherlink);
                    whiteBackChild.appendChild(BR());
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "U") {
                    var alert = showAlert("U", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var UI_Sizerlink = Alinker("◆UI-Sizer", "UnityLibrary.html" + "?v=" + "UI-Sizer");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(UI_Sizerlink);
                }
                if (element.innerText === "W") {
                    var alert = showAlert("W", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "X") {
                    var alert = showAlert("X", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
                if (element.innerText === "Z") {
                    var alert = showAlert("Z", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
                    alert.style.zIndex = "999";
                    var exlink = Alinker("目前尚無資源", "#");
                    var whiteBackChild = alert.querySelector('.white-back');
                    whiteBackChild.appendChild(exlink);
                }
            });
        });
    }
    function Alinker(inner, to) {
        var link = document.createElement("a");
        link.innerHTML = inner;
        link.href = to;
        return link;
    }
    function BR() {
        var br = document.createElement("br");
        return br;
    }
}());
libsources.init();