console.log(localStorage.getItem("userlogin_privatelib_true"));
if (localStorage.getItem("userlogin_privatelib_true") !== "lnv2kor@nkvof8mGo3pkE8s3v5g2e1d8c6sda&$SLgEMsdV") {
    localStorage.setItem("userlogin_privatelib_fail", "true");
    window.location.href = "main.html";
}