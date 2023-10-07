function updateElapsedTime(s) {
    let c = Date.now();
    let e = (c - s) / 1000;
    return e;
}