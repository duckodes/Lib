function Addlibtag({ textContent = "text", color = "#000", backgroundColor = "#fff", outline = "1px solid white", parent = document.body }) {
    var d = document.createElement('div');
    d.textContent = textContent;
    d.style.color = color;
    d.style.borderRadius = "100px";
    d.style.background = backgroundColor;
    d.style.fontSize = "12px";
    d.style.display = "inline-block";
    d.style.textAlign = "center";
    d.style.paddingLeft = "10px";
    d.style.paddingRight = "10px";
    d.style.userSelect = "none";
    d.style.fontWeight = "bold";
    d.style.outline = outline;
    parent.appendChild(d);
}