function loginlibrarycheck(to) {
    var link = document.createElement("a");
    link.style.display = "none";
    var xhr = new XMLHttpRequest();
    link.addEventListener("click", function () {
        xhr.open("HEAD", to, true);
        xhr.send();
    });
    link.click();
    return xhr;
}

function createLoginModal(title, content, closeBtn, closeInner, wantCloseBtnBorder) {
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
    modalContent.style.width = "25%";
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

    var modalLogin = document.createElement("input");
    modalLogin.type = "text";
    modalLogin.id = "data-username";
    modalLogin.name = "data-username";

    var modalLoginButton = document.createElement("button");
    modalLoginButton.innerText = "登入";
    modalLoginButton.addEventListener("click", () => {
        loginF();
    });
    closeModalBtn.addEventListener("click", () => {
        document.removeEventListener("keydown", keydownEvent);
    });
    document.addEventListener("keydown", keydownEvent);
    function keydownEvent(event){
        if (event.keyCode === 13) {
            loginF();
        }
    }
    function loginF() {
        var loginurl = "https://bearhubs.github.io/Profolio/" + modalLogin.value;
        var xhr = loginlibrarycheck(loginurl);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 404) {
                    modalText.textContent = "登入錯誤";
                }
                else if (xhr.status === 200) {
                    if(modalLogin.value !== "" && !modalLogin.value.includes(" ")){
                        var link = document.createElement("a");
                        link.style.display = "none";
                        link.href = modalLogin.value + ".html";
                        link.click();
                    }
                }
            }
        };
    }

    var modalText = document.createElement("p");
    modalText.textContent = content;
    modalText.style.color = "red";

    // Append elements to modal content
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalLogin);
    modalContent.appendChild(modalLoginButton);
    modalContent.appendChild(modalText);

    // Append modal content to modal container
    modal.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modal);

    return modal;
}

// *Show Modal 
function showLogin(title, content, closeBtn, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false) {
    // Get the modal and buttons
    var customModal = createLoginModal(title, content, closeBtn, closeInner, wantCloseBtnBorder);
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
    customModal.style.display = "block";
    return customModal;
}

var wantlogin = document.getElementById("want-login");
if (wantlogin != null) {
    wantlogin.style.cursor = "pointer";
    wantlogin.addEventListener("click", function () {
        var slog = showLogin("? Login Account", "", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false)
        slog.style.zIndex = 999;
    });
}