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
 * @version 1.1.0
 */
var themepackage = (function () {
    return {
        init: init,
        tokyonightdark: tokyonightdark,
        vs2015: vs2015
    };
    function init(id) {
        fileutils.ReadFileText('Resource/Register/localstorage.ordinary-level/8hR7kL3pQ9sT6wE2.localstorage', (text) => {
            if (storageutils.get(text)) {
                tokyonightdark(id);
            }
            else {
                vs2015(id);
            }
        });
    }
    function tokyonightdark(id) {
        var b = document.getElementById(id);
        b.href = "css/tokyo-night-dark.min.css";
    }
    function vs2015(id) {
        var b = document.getElementById(id);
        b.href = "css/vs2015.min.css";
    }
}());
themepackage.init("code-style");