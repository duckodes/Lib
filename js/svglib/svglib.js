function createSVGAnonymous(w = "55", h = "55") {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.setAttribute("viewBox", "0 0 100 100");

    // body
    var body = document.createElementNS("http://www.w3.org/2000/svg", "path");
    body.setAttribute("d", "M40 45 L60 45 70 50 L65 70 L35 70 30 50 Z");
    body.setAttribute("fill", "black");
    body.setAttribute("stroke", "white");
    svg.appendChild(body);

    // tie
    var tie = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tie.setAttribute("d", "M50 30 L50 50 C45 55, 50 60, 50 70 C50 60, 55 55, 50 50 L50 30");
    tie.setAttribute("stroke", "white");
    tie.setAttribute("stroke-width", "3");
    tie.setAttribute("fill", "none");
    svg.appendChild(tie);

    // head
    var head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    head.setAttribute("cx", "50");
    head.setAttribute("cy", "30");
    head.setAttribute("r", "15");
    head.setAttribute("fill", "black");
    head.setAttribute("stroke", "white");
    svg.appendChild(head);

    // questmark
    var questmark = document.createElementNS("http://www.w3.org/2000/svg", "path");
    questmark.setAttribute("d", "M43 30 A8 8 0 1 1 50 35 V41");
    questmark.setAttribute("fill", "none");
    questmark.setAttribute("stroke", "white");
    questmark.setAttribute("stroke-width", "3");
    svg.appendChild(questmark);

    return svg;
}
function createSVGCopy(strokeColor, width) {
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