if(getParameterByName("v", window.location.href) !== "userlogin_privatelib_true"){
    window.location.href = "main.html";
}
window.history.pushState({}, "", "UGPrivateLibrary");
localStorage.setItem("userlogin_privatelib_true", "true");