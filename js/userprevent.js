/**
 * [Reference]
 * 
 * [Bomb.html](../Bomb.html)
 * 
 * [Daily.html](../Daily.html)
 * 
 * [Introduction.html](../Introduction.html)
 * 
 * [main.html](../main.html)
 * 
 * [Portfolio.html](../Portfolio.html)
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * @version 1.0.0
 */
var userprevent = (function () {
    return {
        init: init
    };
    function init() {
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });

        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && e.key === "s" || e.key === "F12" || e.key === "F11" || e.ctrlKey && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }
        });
    }
}());
userprevent.init();