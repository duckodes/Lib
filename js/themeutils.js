var themeutils = (function () {
    return {
        tokyonightdark: tokyonightdark,
        vs2015: vs2015
    };
    function tokyonightdark() {
        var linkstyle = document.getElementById("code-style");
        linkstyle.href = "css/tokyo-night-dark.min.css";
    }
    function vs2015() {
        var linkstyle = document.getElementById("code-style");
        linkstyle.href = "css/vs2015.min.css";
    }
}());