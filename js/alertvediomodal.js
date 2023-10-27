// Quick Guide
// Insert End of html <script src="JS/alertmodal.js"></script>
// Copy Default: showAlert("Video.mp4", "title", "This is content.", true, "&times;", "#f4f4f4", "10px", null, null, "10px", false);
function createAlertVideoModalv2(source, title, content, closeBtn, closeInner, wantCloseBtnBorder) {
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
    modalContent.style.border = "1px solid #888";
    modalContent.style.padding = "20px";
    modalContent.style.width = "auto";
    modalContent.style.height = "auto";
    modalContent.style.maxWidth = "50%";
    modalContent.style.maxHeight = "100%";
    modalContent.style.textAlign = "center";
    modalContent.style.borderRadius = "10px";

    // Create the close button
    var closeModalBtn = document.createElement("span");
    closeModalBtn.innerHTML = closeInner;
    closeModalBtn.className = "close";
    closeModalBtn.style.position = "relative";
    closeModalBtn.style.top = "10px";
    closeModalBtn.style.right = "10px";
    closeModalBtn.style.width = "100%";
    closeModalBtn.style.textAlign = "right";
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

    // Create video modal
    var modalVideo = document.createElement("video");
    var modalVideoSliderControl = document.createElement("div");
    var modalVideoSlider = document.createElement("div");
    var modalVideoSliderHolder = document.createElement("div");
    var modalVideoControlContain = document.createElement("div");
    var modalVideoPlay = document.createElement("p");
    var modalVideoFullScreen = document.createElement("p");
    modalVideo.src = source;
    modalVideo.style.width = "auto";
    modalVideo.style.height = "auto";
    modalVideo.style.maxWidth = "70%";
    modalVideo.style.maxHeight = "90%";
    modalVideo.style.borderRadius = "10px";
    modalVideo.controls = false;
    modalVideo.controlsList = "nodownload nofullscreen";
    modalVideo.controlsList.add("timeline");
    modalVideo.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });
    modalVideo.onclick = function () {
        if(!modalVideo.webkitDisplayingFullscreen){
            if (modalVideo.paused) {
                modalVideo.play();
            }
            else {
                modalVideo.pause();
            }
        }
    }
    modalVideo.addEventListener("ended", function () {
        modalVideoPlay.textContent = "▲";
    });

    // Create video slider
    modalVideoSlider.style.width = "0%";
    modalVideoSlider.style.height = "5px";
    modalVideoSlider.style.backgroundColor = "#007bff";
    modalVideoSlider.style.borderRadius = "10px";
    modalVideoSlider.style.transition = "all 0.09s ease";
    modalVideo.addEventListener("timeupdate", function () {
        var percent = (modalVideo.currentTime / modalVideo.duration) * 100;
        modalVideoSlider.style.width = percent + "%";

        var holderPosition = (percent / 100) * modalVideoSliderControl.offsetWidth - 5;
        modalVideoSliderHolder.style.left = holderPosition + "px";
        if (modal.style.display === "none") {
            modalVideo.pause();
        }
    });

    // Create video slider control
    var isDragging = false;
    var isPlayWhenDrag = false;
    var animationFrameId = null;
    modalVideoSliderControl.style.position = "relative";
    modalVideoSliderControl.style.marginLeft = "20%";
    modalVideoSliderControl.style.width = "60%";
    modalVideoSliderControl.style.background = "#003b99";
    modalVideoSliderControl.style.borderRadius = "10px";
    modalVideoSliderControl.style.cursor = "pointer";
    modalVideoSliderControl.addEventListener("mousedown", function (e) {
        if (isDragging === false) {
            isDragging = true;
            modal.style.cursor = "pointer";
            modalVideoSliderHolder.style.display = "block";
            if (modalVideo.paused === false) {
                modalVideo.pause();
                isPlayWhenDrag = true;
            }

            updateProgress(e);
        }

    });
    document.addEventListener("mousemove", function (e) {
        if (isDragging && animationFrameId === null) {
            requestAnimationFrame(function () {
                animationFrameId = requestAnimationFrame(function () {
                    updateProgress(e);
                    animationFrameId = null;
                });
            });
        }
    });
    document.addEventListener("mouseup", function () {
        isDragging = false;
        modal.style.cursor = "default";
        modalVideoSliderHolder.style.display = "none";
        if (isPlayWhenDrag) {
            modalVideo.play();
            isPlayWhenDrag = false;
        }
    });
    modalVideoSliderControl.addEventListener("mouseenter", function () {
        modalVideoSliderHolder.style.display = "block";
    });

    modalVideoSliderControl.addEventListener("mouseleave", function () {
        if (!isDragging) {
            modalVideoSliderHolder.style.display = "none";
        }
    });
    function updateProgress(e) {
        var rect = modalVideoSliderControl.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var percent = (offsetX / rect.width) * 100;
        var newTime = (percent / 100) * modalVideo.duration;
        modalVideo.currentTime = newTime;
    }
    // Create video slider control holder
    modalVideoSliderHolder.style.display = "none";
    modalVideoSliderHolder.style.position = "absolute";
    modalVideoSliderHolder.style.marginTop = "-3px";
    modalVideoSliderHolder.style.width = "12px";
    modalVideoSliderHolder.style.height = "12px";
    modalVideoSliderHolder.style.background = "#007bff";
    modalVideoSliderHolder.style.borderRadius = "50%";
    modalVideoSliderHolder.style.cursor = "pointer";
    modalVideoSliderHolder.style.transition = "all 0.09s ease";

    // Create video control contain
    modalVideoControlContain.style.width = "100%";
    modalVideoControlContain.style.height = "30px";

    // Create video play button
    modalVideoPlay.textContent = "▲";
    modalVideoPlay.style.position = "relative";
    modalVideoPlay.textAlign = "center";
    modalVideoPlay.style.right = "31%";
    modalVideoPlay.style.bottom = "17px";
    modalVideoPlay.style.height = "30px";
    modalVideoPlay.style.rotate = "90deg";
    modalVideoPlay.style.fontSize = "20px";
    //modalVideoPlay.style.color = 'white';
    modalVideoPlay.style.cursor = "pointer";
    modalVideoPlay.onclick = function () {
        if (modalVideo.paused) {
            modalVideo.play();
        }
        else {
            modalVideo.pause();
        }
    };
    // Create video fullScreen button
    modalVideoFullScreen.textContent = "╬";
    modalVideoFullScreen.style.position = "relative";
    modalVideoFullScreen.style.right = "-80%";
    modalVideoFullScreen.style.bottom = "65px";
    modalVideoFullScreen.style.fontStyle = "bold";
    modalVideoFullScreen.style.transform = 'scaleX(0.8) scaleY(0.6)';
    modalVideoFullScreen.style.width = "30px";
    modalVideoFullScreen.style.height = "30px";
    modalVideoFullScreen.style.fontSize = "30px";
    //modalVideoPlay.style.color = 'white';
    modalVideoFullScreen.style.cursor = "pointer";
    modalVideoFullScreen.onclick = function () {
        modalVideo.requestFullscreen();
    };

    // Append elements to modal content
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalTitle);

    modalContent.appendChild(modalVideo);
    modalContent.appendChild(modalVideoSliderControl);
    modalVideoSliderControl.appendChild(modalVideoSlider);
    modalVideoSlider.appendChild(modalVideoSliderHolder);
    modalContent.appendChild(modalVideoControlContain);
    modalVideoControlContain.appendChild(modalVideoPlay);
    modalVideoControlContain.appendChild(modalVideoFullScreen);

    modalContent.appendChild(modalText);

    // Append modal content to modal container
    modal.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modal);

    return modal;
}
// Create a function to generate the custom modal
function createAlertVideoModal(source, title, content, closeBtn, closeInner, wantCloseBtnBorder) {
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

    // Create the modal content
    var modalContent = document.createElement("div");
    modalContent.className = "white-back";
    modalContent.style.backgroundColor = "#f4f4f4";
    // old position
    //modalContent.style.margin = "15% auto";
    // new position center
    modalContent.style.position = "fixed";
    modalContent.style.top = "50%";
    modalContent.style.left = "50%";
    modalContent.style.transform = "translate(-50%, -50%)";

    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "50%";
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

    // Create video modal
    var modalVideo = document.createElement("video");
    var modalVideoSliderControl = document.createElement("div");
    var modalVideoSlider = document.createElement("div");
    var modalVideoSliderHolder = document.createElement("div");
    var modalVideoControlContain = document.createElement("div");
    var modalVideoPlay = document.createElement("p");
    var modalVideoFullScreen = document.createElement("p");
    modalVideo.src = source;
    modalVideo.style.width = "100%";
    modalVideo.style.height = "100%";
    modalVideo.style.borderRadius = "10px";
    modalVideo.controls = false;
    modalVideo.controlsList = "nodownload nofullscreen";
    modalVideo.controlsList.add("timeline");
    modalVideo.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });
    modalVideo.onclick = function () {
        if (modalVideo.paused) {
            modalVideo.play();
            modalVideoPlay.textContent = "⚌";
        }
        else {
            modalVideo.pause();
            modalVideoPlay.textContent = "▲";
        }
    }
    modalVideo.addEventListener("ended", function () {
        modalVideoPlay.textContent = "▲";
    });

    // Create video slider
    modalVideoSlider.style.width = "0%";
    modalVideoSlider.style.height = "5px";
    modalVideoSlider.style.backgroundColor = "#007bff";
    modalVideoSlider.style.borderRadius = "10px";
    modalVideo.addEventListener("timeupdate", function () {
        var percent = (modalVideo.currentTime / modalVideo.duration) * 100;
        modalVideoSlider.style.width = percent + "%";

        var holderPosition = (percent / 100) * modalVideoSliderControl.offsetWidth - 5;
        modalVideoSliderHolder.style.left = holderPosition + "px";
        if (modal.style.display === "none") {
            modalVideo.pause();
        }
    });

    // Create video slider control
    var isDragging = false;
    var isPlayWhenDrag = false;
    modalVideoSliderControl.style.position = "relative";
    modalVideoSliderControl.style.marginLeft = "5%";
    modalVideoSliderControl.style.width = "90%";
    modalVideoSliderControl.style.background = "#003b99";
    modalVideoSliderControl.style.borderRadius = "10px";
    modalVideoSliderControl.style.cursor = "pointer";
    modalVideoSliderControl.addEventListener("mousedown", function (e) {
        isDragging = true;
        modal.style.cursor = "pointer";
        modalVideoSliderHolder.style.display = "block";
        if (modalVideo.paused === false) {
            modalVideo.pause();
            modalVideoPlay.textContent = "▲";
            isPlayWhenDrag = true;
        }
        requestAnimationFrame(function () {
            updateProgress(e);
        });
    });
    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            requestAnimationFrame(function () {
                updateProgress(e);
            });
        }
    });
    document.addEventListener("mouseup", function () {
        isDragging = false;
        modal.style.cursor = "default";
        modalVideoSliderHolder.style.display = "none";
        if (isPlayWhenDrag) {
            modalVideo.play();
            modalVideoPlay.textContent = "⚌";
            isPlayWhenDrag = false;
        }
    });
    function updateProgress(e) {
        var rect = modalVideoSliderControl.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var percent = (offsetX / rect.width) * 100;
        var newTime = (percent / 100) * modalVideo.duration;
        modalVideo.currentTime = newTime;
    }
    // Create video slider control holder
    modalVideoSliderHolder.style.display = "none";
    modalVideoSliderHolder.style.position = "absolute";
    modalVideoSliderHolder.style.marginTop = "-3px";
    modalVideoSliderHolder.style.width = "12px";
    modalVideoSliderHolder.style.height = "12px";
    modalVideoSliderHolder.style.background = "#007bff";
    modalVideoSliderHolder.style.borderRadius = "50%";
    modalVideoSliderHolder.style.cursor = "pointer";

    // Create video control contain
    modalVideoControlContain.style.width = "100%";
    modalVideoControlContain.style.height = "30px";

    // Create video play button
    modalVideoPlay.textContent = "▲";
    modalVideoPlay.style.position = "absolute";
    modalVideoPlay.style.left = "5px";
    modalVideoPlay.style.bottom = "70px";
    modalVideoPlay.style.width = "30px";
    modalVideoPlay.style.height = "30px";
    modalVideoPlay.style.rotate = "90deg";
    //modalVideoPlay.style.color = 'white';
    modalVideoPlay.style.cursor = "pointer";
    modalVideoPlay.onclick = function () {
        if (modalVideo.paused) {
            modalVideo.play();
            modalVideoPlay.textContent = "⚌";
        }
        else {
            modalVideo.pause();
            modalVideoPlay.textContent = "▲";
        }
    };
    // Create video fullScreen button
    modalVideoFullScreen.textContent = "╬";
    modalVideoFullScreen.style.position = "absolute";
    modalVideoFullScreen.style.right = "10px";
    modalVideoFullScreen.style.bottom = "66px";
    modalVideoFullScreen.style.fontStyle = "bold";
    modalVideoFullScreen.style.transform = 'scaleX(1) scaleY(0.6)';
    modalVideoFullScreen.style.width = "30px";
    modalVideoFullScreen.style.height = "30px";
    //modalVideoPlay.style.color = 'white';
    modalVideoFullScreen.style.cursor = "pointer";
    modalVideoFullScreen.onclick = function () {
        modalVideo.requestFullscreen();
    };

    // Append elements to modal content
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalTitle);

    modalContent.appendChild(modalVideo);
    modalContent.appendChild(modalVideoSliderControl);
    modalVideoSliderControl.appendChild(modalVideoSlider);
    modalVideoSlider.appendChild(modalVideoSliderHolder);
    modalContent.appendChild(modalVideoControlContain);
    modalVideoControlContain.appendChild(modalVideoPlay);
    modalVideoControlContain.appendChild(modalVideoFullScreen);

    modalContent.appendChild(modalText);

    // Append modal content to modal container
    modal.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modal);

    return modal;
}

// *Show Modal 
function showAlertVideo(source, title, content, closeBtn, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false) {
    // Get the modal and buttons
    var customModal = createAlertVideoModalv2(source, title, content, closeBtn, closeInner, wantCloseBtnBorder);
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
    clickShowAlert("Alert Windows", "openAlertModalBtn","This is content.", true, "確認", "#f4f4f4", "10px", null, null, "10px", true);
</script>

</html>*/
function clickShowAlertVideo(source, useAlertID, title, content, closeBtn, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false) {
    var openModalBtn = document.getElementById(useAlertID);

    // Open the modal
    if (openModalBtn != null) {
        openModalBtn.onclick = function () {
            showAlertVideo(source, title, content, closeBtn, closeInner, alertBackColor, top, bottom, left, right, wantCloseBtnBorder);
        }
    }
}