/**
 * simply function to process a id with link
 * @param {string} id - target id
 * @param {string} url - link
 */
function isetlink(id, url) {
    if (id !== null) {
        const i = document.getElementById(id);
        i.addEventListener("click", function () {
            window.location.href = url;
        });
    }
}
/**
 * simply function to process a id with link
 * @param {string} cls - target class (must add . at begin)
 * @param {string} url - link
 */
function csetlink(cls, url) {
    if (cls !== null) {
        const c = document.querySelector(cls);
        c.addEventListener("click", function () {
            window.location.href = url;
        });
    }
}