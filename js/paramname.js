/**
 * [Reference]
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * [limitlibs.js](limitlibs.js)
 * 
 * [limitlib.js](limitlib.js)
 * 
 * [libsearch.js](libsearch.js)
 * 
 * [libdocument.js](libdocument.js)
 * 
 * @version 1.1.0
 */
var paramname = (function () {
    return {
        getParameterByName: getParameterByName
    };
    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}());