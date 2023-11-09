fetch('Resource/Private.Link.net/private=link=end.ugc')
    .then(response => {
        if (!response.ok) {
            throw new Error('fileError');
        }
        return response.text();
    })
    .then(text => {
        if (getParameterByName("v", window.location.href) !== getParameterByName("v", text)) {
            if (localStorage.getItem("userlogin_privatelib_true") !== "lnv2kor@nkvof8mGo3pkE8s3v5g2e1d8c6sda&$SLgEMsdV") {
                localStorage.removeItem("userlogin_privatelib_true");
                localStorage.setItem("userlogin_privatelib_fail", "true");
                window.location.href = "main.html";
            }
            else {
                window.history.pushState({}, "", "UGPrivateLibrary");
            }
        }
        else {
            localStorage.setItem("userlogin_privatelib_true", "lnv2kor@nkvof8mGo3pkE8s3v5g2e1d8c6sda&$SLgEMsdV");
            window.history.pushState({}, "", "UGPrivateLibrary.html");
            window.location.reload();
        }
    })
    .catch(error => {
        console.error(error);
    });

//ask want to reload or close
//window.onbeforeunload = () => {return ''};