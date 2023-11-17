ReadFileText('Resource/Keep/key.ugc', (key) => {
    ReadFileText('Resource/Keep/lock.ugc', (lock) => {
        if (localStorage.getItem(key) !== lock) {
            localStorage.removeItem(key);
            localStorage.setItem("userlogin_privatelib_fail", "true");
            window.location.href = "main.html";
        }
    });
});

window.history.pushState({}, "", "UGPrivateLibrary.html" + "?v=" + getParameterByName("v", window.location.href));