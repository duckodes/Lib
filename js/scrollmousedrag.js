/**
 * [Reference]
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * @version 1.1.0
 */
var scrollmousedrag = (function(){
    return{
        idrag: idrag
    };
    function idrag(id) {
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
}());