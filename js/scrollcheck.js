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
var scrollcheck = (function () {
    return {
        winsy0: winsy0
    };
    function winsy0(tp, b, m) {
        window.addEventListener('scroll', function () {
            if (window.scrollY === 0) {
                tp();
            } else if (isScrolledToBottom()) {
                b();
            } else {
                m();
            }
        });
    }
    function isScrolledToBottom() {
        const winh = window.innerHeight;
        const doch = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        const scrollY = window.scrollY || window.pageYOffset;
        return winh + scrollY >= doch;
    }
}());