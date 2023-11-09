function Addlibtag({ text = "text", textcolor = "#00", bgcolor = "#fff", parent = document.body }) {
    var d = document.createElement('div');
    d.textContent = text;
    d.style.color = textcolor;
    d.style.borderRadius = "100px";
    d.style.backgroundColor = bgcolor;
    d.style.fontSize = "12px";
    d.style.display = "inline-block";
    d.style.textAlign = "center";
    d.style.paddingLeft = "10px";
    d.style.paddingRight = "10px";
    d.style.userSelect = "none";
    d.style.fontWeight = "bold";
    parent.appendChild(d);
}