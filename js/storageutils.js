storageutils = (function (){
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