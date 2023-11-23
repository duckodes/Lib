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
 * @version 1.0.0
 */
var themepackage = (function () {
    return {
        init: init,
        tokyonightdark: tokyonightdark,
        vs2015: vs2015
    };
    function init(id) {
        if (storageutils.get('active')) {
            tokyonightdark(id);
        }
        else {
            vs2015(id);
        }
    }
    function tokyonightdark(id) {
        var linkstyle = document.getElementById(id);
        linkstyle.href = "css/tokyo-night-dark.min.css";
    }
    function vs2015(id) {
        var linkstyle = document.getElementById(id);
        linkstyle.href = "css/vs2015.min.css";
    }
}());
themepackage.init("code-style");