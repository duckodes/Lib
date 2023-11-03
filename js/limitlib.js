if (getParameterByName("v", window.location.href) !== "userlogin_privatelib_true") {
    if (localStorage.getItem("userlogin_privatelib_true") !== "lnv2kor@nkvof8mGo3pkE8s3v5g2e1d8c6sda&$SLgEMsdV"){
        window.location.href = "main.html";
    }
}
else {
    localStorage.setItem("userlogin_privatelib_true", "lnv2kor@nkvof8mGo3pkE8s3v5g2e1d8c6sda&$SLgEMsdV");
}
window.history.pushState({}, "", "UGPrivateLibrary");