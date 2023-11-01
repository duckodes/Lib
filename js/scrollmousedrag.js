function scrollmousedrag(id) {
    const scrollContainer = document.getElementById(id);

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - scrollContainer.getBoundingClientRect().left;
        startY = e.clientY - scrollContainer.getBoundingClientRect().top;
        scrollLeft = scrollContainer.scrollLeft;
        scrollTop = scrollContainer.scrollTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - scrollContainer.getBoundingClientRect().left - startX;
        const deltaY = e.clientY - scrollContainer.getBoundingClientRect().top - startY;
        scrollContainer.scrollLeft = scrollLeft - deltaX;
        scrollContainer.scrollTop = scrollTop - deltaY;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}