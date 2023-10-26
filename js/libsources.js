var blacklibsources = document.querySelectorAll('.black-lib-sources');
var whitelibsources = document.querySelectorAll('.white-lib-sources');
blacklibsources.forEach(function (element) {
    element.addEventListener("click", function () {
        if (element.innerText === "A") {
            var alert = showAlert("A", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
            alert.style.zIndex = "999";
            var br = BR();
            var exlink = Alinker("◆ex", "//www.youtube.com");
            var whiteBackChild = alert.querySelector('.white-back');
            whiteBackChild.appendChild(exlink);
        }
        if (element.innerText === "C") {
            var alert = showAlert("C", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
            alert.style.zIndex = "999";
            var br = BR();
            var exlink = Alinker("◆ex", "//www.youtube.com");
            var whiteBackChild = alert.querySelector('.white-back');
            whiteBackChild.appendChild(exlink);
        }
    });
});
whitelibsources.forEach(function (element) {
    element.addEventListener("click", function () {
        if (element.innerText === "S") {
            var alert = showAlert("S", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
            alert.style.zIndex = "999";
            var br = BR();
            var Seacherlink = Alinker("◆Seacher", "SearcherLink.html");
            var exlink = Alinker("◆ex", "//www.youtube.com");
            var whiteBackChild = alert.querySelector('.white-back');
            whiteBackChild.appendChild(Seacherlink);
            whiteBackChild.appendChild(br);
            whiteBackChild.appendChild(exlink);
        }
        if (element.innerText === "B") {
            var alert = showAlert("B", "Libs", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false);
            alert.style.zIndex = "999";
            var br = BR();
            var exlink = Alinker("◆ex", "//www.youtube.com");
            var whiteBackChild = alert.querySelector('.white-back');
            whiteBackChild.appendChild(exlink);
        }
    });
});
function Alinker(inner, to) {
    var link = document.createElement("a");
    link.innerHTML = inner;
    link.href = to;
    return link;
}
function BR() {
    var br = document.createElement("br");
    return br;
}