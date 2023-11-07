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