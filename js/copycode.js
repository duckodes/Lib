function copycode(copybuttonid, textcopyid) {
    var copyButton = document.getElementById(copybuttonid);
    var textToCopy = document.getElementById(textcopyid);
    copyButton.addEventListener("click", function () {
        var text = textToCopy.textContent;

        var tempTextArea = document.createElement("textarea");
        tempTextArea.value = text;

        tempTextArea.style.position = "fixed";
        tempTextArea.style.top = 0;
        tempTextArea.style.left = 0;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand("copy");

        document.body.removeChild(tempTextArea);

        copyButton.innerHTML = " ";
        var icon = createIcon("currentColor", "1em");
        copyButton.appendChild(icon);
        copyButton.innerHTML += " 已複製 ";
        setTimeout(function () {
            copyButton.innerHTML = " ";
            var icon = createIcon("currentColor", "1em");
            copyButton.appendChild(icon);
            copyButton.innerHTML += " Recopy ";
            copyButton.style.border = "0.1px solid #333";
        }, 2000);
    });
}

function createIcon(strokeColor, width) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "icon-sm");
    svg.setAttribute("height", width);
    svg.setAttribute("width", width);

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2");

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "8");
    rect.setAttribute("y", "2");
    rect.setAttribute("width", "8");
    rect.setAttribute("height", "4");
    rect.setAttribute("rx", "1");
    rect.setAttribute("ry", "1");

    svg.appendChild(path);
    svg.appendChild(rect);

    return svg;
}