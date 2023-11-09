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

function createSVGEye(strokeColor, width) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "icon-sm");
    svg.setAttribute("height", width);
    svg.setAttribute("width", width);

    // Top
    var topPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    topPath.setAttribute("d", "M40 55 C 50 45, 60 45, 80 55");
    topPath.setAttribute("fill", "none");
    topPath.setAttribute("stroke", "white");
    topPath.setAttribute("stroke-width", "3");
    svg.appendChild(topPath);

    // Bottom
    var bottomPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bottomPath.setAttribute("d", "M40 55 C 50 65, 60 65, 80 55");
    bottomPath.setAttribute("fill", "none");
    bottomPath.setAttribute("stroke", "white");
    bottomPath.setAttribute("stroke-width", "3");
    svg.appendChild(bottomPath);

    // Circle
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "57");
    circle.setAttribute("cy", "55");
    circle.setAttribute("r", "7");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "3");
    svg.appendChild(circle);

    return svg;
}
function useTaggers() {
    class SVI extends HTMLElement {
        constructor() {
            super();

            this.style.color = "black";
            this.style.userSelect = "none";
            if (this.getAttribute('con') === "anonymous-0") {
                if (!this.hasAttribute("size")) {
                    this.setAttribute("size", "55");
                }
                if (!this.hasAttribute("color")) {
                    this.setAttribute("color", "white");
                }
                if (!this.hasAttribute("color-back")) {
                    this.setAttribute("color-back", "black");
                }
                var main = createSVGAnonymous(this.getAttribute("size"), this.getAttribute("size"));
                main.setAttribute('stroke', this.getAttribute('color'));
                var children = main.children;
                children[1].setAttribute('stroke', this.getAttribute('color'));
                children[3].setAttribute('stroke', this.getAttribute('color'));
                children[0].setAttribute('stroke', this.getAttribute('color'));
                children[0].setAttribute('fill', this.getAttribute('color-back'));
                children[2].setAttribute('stroke', this.getAttribute('color'));
                children[2].setAttribute('fill', this.getAttribute('color-back'));
                this.appendChild(main);
            }
            if (this.getAttribute('con') === "copy-0") {
                if (!this.hasAttribute("size")) {
                    this.setAttribute("size", "25");
                }
                if (!this.hasAttribute("color")) {
                    this.setAttribute("color", "white");
                }
                if (!this.hasAttribute("color-back")) {
                    this.setAttribute("color-back", "transparent");
                }
                var main = createSVGCopy(this.getAttribute('color'), this.getAttribute("size"));
                var children = main.children;
                children[0].setAttribute('fill', this.getAttribute('color-back'));
                children[1].setAttribute('fill', this.getAttribute('color-back'));
                this.appendChild(main);
            }
            if (this.getAttribute('con') === "eye-0") {
                if (!this.hasAttribute("size")) {
                    this.setAttribute("size", "50");
                }
                if (!this.hasAttribute("color")) {
                    this.setAttribute("color", "white");
                }
                if (!this.hasAttribute("color-back")) {
                    this.setAttribute("color-back", "transparent");
                }
                var main = createSVGEye(this.getAttribute('color'), this.getAttribute("size"));
                var children = main.children;
                children[0].setAttribute('stroke', this.getAttribute('color'));
                children[1].setAttribute('stroke', this.getAttribute('color'));
                children[2].setAttribute('stroke', this.getAttribute('color'));
                children[0].setAttribute('fill', this.getAttribute('color-back'));
                children[1].setAttribute('fill', this.getAttribute('color-back'));
                children[2].setAttribute('fill', this.getAttribute('color-back'));
                this.appendChild(main);
            }
        }
    }

    customElements.define('svg-i', SVI);
}
useTaggers();