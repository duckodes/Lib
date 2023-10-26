function createImgModal(title, content, closeBtn, closeInner, wantCloseBtnBorder, source) {
    // Create the modal container
    var modal = document.createElement("div");
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.8)";
    modal.style.userSelect = "none"
    modal.style.zIndex = "999";
    modal.style.overflow = "auto";
    document.body.style.overflow = "hidden";

    // Create the close button
    var closeModalBtn = document.createElement("span");
    closeModalBtn.innerHTML = closeInner;
    closeModalBtn.className = "close";
    closeModalBtn.style.position = "sticky";
    closeModalBtn.style.top = "1%";
    closeModalBtn.style.textAlign = "right";
    closeModalBtn.style.marginRight = "1%";
    closeModalBtn.style.color = "white";
    if (wantCloseBtnBorder) {
        closeModalBtn.style.border = "2px solid #353535";
        closeModalBtn.style.borderRadius = "5px";
    }
    closeModalBtn.style.fontSize = "30px";
    closeModalBtn.style.fontWeight = "bold";
    closeModalBtn.style.cursor = "pointer";
    if (closeBtn) {
        closeModalBtn.style.display = "block";
    }
    else {
        closeModalBtn.style.display = "none";
    }

    // Create modal content text
    var modalTitle = document.createElement("h2");
    modalTitle.textContent = title;
    modalTitle.style.color = "white";

    var modalText = document.createElement("p");
    modalText.textContent = content;
    modalText.style.color = "white";

    var modalImg = document.createElement("img");
    modalImg.src = source;
    modalImg.style.position = "relative";
    modalImg.style.top = "-2.5%";
    modalImg.style.left = "25%";
    modalImg.style.width = "50%";

    // Append modal content to modal container
    modal.appendChild(closeModalBtn);
    modal.appendChild(modalImg);

    // Append modal container to body
    document.body.appendChild(modal);

    return modal;
}

// *Show Modal
function showImg(source, title, content, closeBtn, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false) {
    // Get the modal and buttons
    var customModal = createImgModal(title, content, closeBtn, closeInner, wantCloseBtnBorder, source);
    if (customModal.querySelector(".white-back") != null) {
        customModal.querySelector(".white-back").style.backgroundColor = alertBackColor;
    }
    // Close the modal when clicking the close button
    if (customModal.querySelector(".close") != null) {
        customModal.querySelector(".close").style.top = top;
        customModal.querySelector(".close").style.bottom = bottom;
        customModal.querySelector(".close").style.left = left;
        customModal.querySelector(".close").style.right = right;

        customModal.querySelector(".close").onclick = function () {
            customModal.style.display = "none";
            customModal.remove();
            document.body.style.overflow = "auto";
        }
    }
    // Close the modal when clicking outside the modal
    window.onclick = function (event) {
        if (event.target == customModal) {
            customModal.style.display = "none";
            customModal.remove();
            document.body.style.overflow = "auto";
        }
    }
    customModal.style.display = "block";
}