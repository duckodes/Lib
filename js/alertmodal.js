// Quick Guide
// Insert End of html <script src="JS/alertmodal.js"></script>
// Click Element id="openAlertModalBtn"
// Copy Default: showAlert("title", "This is content.", true, "&times;", "#f4f4f4", "10px", null, null, "10px", false);

// Create a function to generate the custom modal
function createAlertModal(title, content, closeBtn, closeInner, wantCloseBtnBorder) {
    // Create the modal container
    var modal = document.createElement("div");
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.7)";
    modal.style.userSelect = "none";
    modal.style.zIndex = "999";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";

    // Create the modal content
    var modalContent = document.createElement("div");
    modalContent.className = "white-back";
    modalContent.style.backgroundColor = "#f4f4f4";
    // old position
    //modalContent.style.margin = "15% auto";
    // new position center
    //modalContent.style.position = "fixed";
    //modalContent.style.top = "50%";
    //modalContent.style.left = "50%";
    //modalContent.style.transform = "translate(-50%, -50%)";

    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "auto";
    modalContent.style.height = "auto";
    modalContent.style.maxHeight = "80%";
    modalContent.style.maxWidth = "80%";
    modalContent.style.textAlign = "center";
    modalContent.style.position = "relative";
    modalContent.style.borderRadius = "10px";

    // Create the close button
    var closeModalBtn = document.createElement("span");
    closeModalBtn.innerHTML = closeInner;
    closeModalBtn.className = "close";
    closeModalBtn.style.position = "absolute";
    closeModalBtn.style.top = "10px";
    closeModalBtn.style.right = "10px";
    if (wantCloseBtnBorder) {
        closeModalBtn.style.border = "2px solid #353535";
        closeModalBtn.style.borderRadius = "5px";
    }
    closeModalBtn.style.fontSize = "20px";
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

    var modalText = document.createElement("p");
    modalText.textContent = content;

    // Append elements to modal content
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);

    // Append modal content to modal container
    modal.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modal);

    return modal;
}

// *Show Modal 
function showAlert(title, content, closeBtn, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false) {
    // Get the modal and buttons
    var customModal = createAlertModal(title, content, closeBtn, closeInner, wantCloseBtnBorder);
    if (customModal.querySelector(".white-back") != null) {
        customModal.querySelector(".white-back").style.backgroundColor = alertBackColor;
    }
    if (customModal.querySelector(".close") != null) {
        customModal.querySelector(".close").style.top = top;
        customModal.querySelector(".close").style.bottom = bottom;
        customModal.querySelector(".close").style.left = left;
        customModal.querySelector(".close").style.right = right;

        // Close the modal when clicking the close button
        customModal.querySelector(".close").onclick = function () {
            customModal.style.display = "none";
            customModal.remove();
        }
    }
    customModal.style.display = "flex";
    return customModal;
}

// Click using ID
// Example:
/*<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Modal</title>

</head>

<body>
    <button id="openAlertModalBtn">Alert modal</button>
</body>

<script src="JS/alertmodal.js"></script>
<script>
    clickShowAlert("Alert Windows", "This is content.", true, "確認", "#f4f4f4", "10px", null, null, "10px", true);
</script>

</html>*/
function clickShowAlert(useAlertID, title, content, closeBtn, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false) {
    var openModalBtn = document.getElementById(useAlertID);

    // Open the modal
    if (openModalBtn != null) {
        openModalBtn.onclick = function () {
            showAlert(title, content, closeBtn, closeInner, alertBackColor, top, bottom, left, right, wantCloseBtnBorder);
        }
    }
}