if (typeof fileutils.ReadFileText === 'function') {
    fileutils.ReadFileText('Resource/Keep/key.ugc', (key) => {
        fileutils.ReadFileText('Resource/Keep/lock.ugc', (lock) => {
            if (localStorage.getItem(key) !== lock) {
                localStorage.removeItem(key);
                localStorage.setItem("userlogin_privatelib_fail", "true");
                window.location.href = "main.html";
            }
        });
    });
}
else {
    localStorage.setItem("userlogin_privatelib_fail", "true");
    window.location.href = "main.html";
}

if(typeof paramname.getParameterByName === 'function'){
    window.history.pushState({}, "", "UGPrivateLibrary.html" + "?v=" + paramname.getParameterByName("v", window.location.href));
}