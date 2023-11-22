if (typeof fileutils.ReadFileText === 'function') {
    fileutils.ReadFileText('Resource/Keep/key.ugc', (key) => {
        fileutils.ReadFileText('Resource/Keep/lock.ugc', (lock) => {
            fileutils.ReadFileText('Resource/Private.Link.net/private=link=end.ugc', (text) => {
                if (paramname.getParameterByName("v", window.location.href) !== paramname.getParameterByName("v", text)) {
                    if (localStorage.getItem(key) !== lock) {
                        localStorage.removeItem(key);
                        localStorage.setItem("userlogin_privatelib_fail", "true");
                        window.location.href = "main.html";
                    }
                    else {
                        window.history.pushState({}, "", "UGPrivateLibrary");
                    }
                }
                else {
                    localStorage.setItem(key, lock);
                    window.history.pushState({}, "", "UGPrivateLibrary.html");
                    window.location.reload();
                }
            });
        });
    });
}
else {
    localStorage.setItem("userlogin_privatelib_fail", "true");
    window.location.href = "main.html";
}

//ask want to reload or close
//window.onbeforeunload = () => {return ''};