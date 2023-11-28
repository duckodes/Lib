/**
 * [Reference]
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * [themepackage.js](themepackage.js)
 * 
 * [liboption.js](liboption.js)
 * 
 * [libsources.js](libsources.js)
 * 
 * @version 1.1.0
 */
var storageutils = (function (){
    return{
        set: set,
        get: get
    };
    function set(k, v){
        localStorage.setItem(k, v);
    }
    function get(k){
        return JSON.parse(localStorage.getItem(k));
    }
}());