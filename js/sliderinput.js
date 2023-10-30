function showslider(v, a, b) {
    var s = document.createElement("input");
    s.style.width = "100%";
    s.type = "range";
    s.min = a;
    s.max = b;
    s.value = v;
    return s;
}