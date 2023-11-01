function winsy0(t, d, n) {
    window.addEventListener('scroll', function () {
        if (window.scrollY === 0) {
            t();
        } else if (isScrolledToBottom()) {
            d();
        } else {
            n();
        }
    });
}
function isScrolledToBottom() {
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    const scrollY = window.scrollY || window.pageYOffset;
    return windowHeight + scrollY >= documentHeight;
}