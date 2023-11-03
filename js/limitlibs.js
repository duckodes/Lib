console.log(localStorage.getItem("userlogin_privatelib_true"));
if (localStorage.getItem("userlogin_privatelib_true") !== "true") {
    window.location.href = "main.html";
}
window.addEventListener('beforeunload', function (e) {
    localStorage.removeItem("userlogin_privatelib_true");
});