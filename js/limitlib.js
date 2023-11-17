ReadFileText('Resource/Keep/key.ugc', (key) => {
    ReadFileText('Resource/Keep/lock.ugc', (lock) => {
        ReadFileText('Resource/Private.Link.net/private=link=end.ugc', (text) => {
            if (getParameterByName("v", window.location.href) !== getParameterByName("v", text)) {
            
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
fetch('Resource/Private.Link.net/private=link=end.ugc')
    .then(response => {
        if (!response.ok) {
            throw new Error('fileError');
        }
        return response.text();
    })
    .then(text => {
        
    })
    .catch(error => {
        console.error(error);
    });

//ask want to reload or close
//window.onbeforeunload = () => {return ''};