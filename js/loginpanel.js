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

    var modalLogin = document.createElement("input");
    modalLogin.style.width = "50%";
    modalLogin.type = "password";
    modalLogin.id = "data-username";
    modalLogin.name = "data-username";
    modalLogin.autocomplete = "off";

    var modalOnPassword = document.createElement("input");
    modalOnPassword.type = "checkbox";
    modalOnPassword.addEventListener("change", () => {
        if (modalOnPassword.checked) {
            modalLogin.type = "text";
        }
        else {
            modalLogin.type = "password";
        }
    });

    var modalLoginButton = document.createElement("button");
    modalLoginButton.innerText = "登入";
    modalLoginButton.addEventListener("click", () => {
        loginF();
    });
    closeModalBtn.addEventListener("click", () => {
        document.removeEventListener("keydown", keydownEvent);
    });
    document.addEventListener("keydown", keydownEvent);
    function keydownEvent(event) {
        if (event.keyCode === 13) {
            loginF();
        }
    }
    function loginF() {
        var loginurl = "https://bearhubs.github.io/Profolio/" + "UG" + modalLogin.value + "rary";
        var xhr = loginlibrarycheck(loginurl);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 404) {
                    modalText.textContent = "登入錯誤";
                }
                else if (xhr.status === 200) {
                    if (modalLogin.value !== "" && !modalLogin.value.includes(" ")) {
                        var link = document.createElement("a");
                        link.style.display = "none";
                        link.href = "UG" + modalLogin.value + "rary.html";
                        link.click();
                    }
                    else {
                        modalText.textContent = "輸入項不可為空";
                    }
                }
            }
        };
        xhr.onerror = function () {
            modalText.textContent = "未連接網路";
        };
        xhr.onabort = function () {
            modalText.textContent = "逾時連線";
        };

    }

    var modalText = document.createElement("p");
    modalText.textContent = content;
    modalText.style.color = "red";

    // Append elements to modal content

    if (typeof createSVGAnonymous === 'function'){
        var createSVG = createSVGAnonymous();
        modalContent.appendChild(createSVG);
    }
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalLogin);
    modalContent.appendChild(modalOnPassword);
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
    window.onclick = function (event) {
        if (event.target == customModal) {
            customModal.style.display = "none";
            customModal.remove();
        }
    }
    customModal.style.display = "flex";
    return customModal;
}

var wantlogin = document.getElementById("want-login");
if (wantlogin != null) {
    wantlogin.style.cursor = "pointer";
    wantlogin.addEventListener("click", function () {
        var slog = showLogin("Login Account", "", true, closeInner = "&times;", alertBackColor = "#f4f4f4", top = "10px", bottom = null, left = null, right = "10px", wantCloseBtnBorder = false)
        slog.style.zIndex = 999;
    });
}