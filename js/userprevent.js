document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "s" || e.key === "F12" || e.key === "F11" || e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }
});