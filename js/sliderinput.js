function showslider(v, a, b, st = "1") {
    var s = document.createElement("input");
    s.style.width = "100%";
    s.type = "range";
    s.min = a;
    s.max = b;
    s.value = v;
    s.step = st;
    return s;
}