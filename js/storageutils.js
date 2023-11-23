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
 * @version 1.0.0
 */
var storageutils = (function (){
    return{
        set: set,
        get: get
    };
    function set(k, bln){
        localStorage.setItem(k, bln);
    }
    function get(k){
        return JSON.parse(localStorage.getItem(k));
    }
}());