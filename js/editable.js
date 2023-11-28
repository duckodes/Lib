/**
 * [Reference]
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * @version 1.1.0
 */
var editable = (function () {
    return {
        editablecontent: editablecontent
    };
    function editablecontent(id) {
        const editor = document.getElementById(id);
        editor.setAttribute("contenteditable", "true");
        editor.addEventListener('blur', () => {
            editor.innerHTML = hljs.highlightAuto(editor.innerText).value;
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Tab") {
                e.preventDefault();
                document.execCommand("insertText", false, "    ");
            }
        });
    }
}());