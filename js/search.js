var navb = document.querySelector('.navbar');
var searchbuttonarea = document.createElement("div");
searchbuttonarea.style.backgroundColor = "white";
searchbuttonarea.style.width = "35%";
searchbuttonarea.style.height = "50%";
searchbuttonarea.style.top = "20%";
searchbuttonarea.style.marginLeft = "32.5%";
searchbuttonarea.style.display = "flex";
searchbuttonarea.style.flexDirection = "column";
searchbuttonarea.style.background = "#1a1b26";
searchbuttonarea.style.borderRadius = "20px";
navb.appendChild(searchbuttonarea);
var source = ["Counter", "DraggablePanel", "Searcher"];
var searchbar = document.querySelector('.search-bar');
var searchbarfocus = true;
searchbar.addEventListener("input", () => {
    searchbuttonarea.style.display = "flex";
    clearButtons();
    searchIO(source, (items) => {
        var button = document.createElement('div');
        button.className = 'search-list-button';
        button.innerText = items;
        button.style.textAlign = "left";
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.height = "auto";
        button.style.minHeight = "40px";
        button.style.paddingLeft = "5%";
        button.style.color = "#7dcfff";
        button.style.background = "#1a1b26";
        button.style.borderRadius = "10px";
        button.addEventListener("mouseenter", () => {
            button.style.background = "#2b2c37";
            searchbarfocus = false;
        });
        button.addEventListener("mouseleave", () => {
            button.style.background = "#1a1b26";
            searchbarfocus = true;
        });
        button.addEventListener("mouseup", () => {
            searchbarfocus = true;
            searchbuttonarea.style.display = "none";
        });
        button.addEventListener("click", () => {
            searchbar.value = items;
            onclicksearch(button);
        });
        searchbuttonarea.appendChild(button);
    });
    selectarrow();
});
searchbar.addEventListener("focus", () => {
    searchbuttonarea.style.display = "flex";
});
searchbar.addEventListener("blur", () => {
    if (!searchbarfocus) {
        searchbar.focus();
    }
    else {
        searchbuttonarea.style.display = "none";
    }
});
function clearButtons() {
    var buttons = document.querySelectorAll('.search-list-button');
    buttons.forEach(button => {
        button.remove();
    });
}
function searchIO(source, fc) {
    source.forEach(item => {
        var searchValue = searchbar.value.toLowerCase();
        var itemLowerCase = item.toLowerCase();
        if (itemLowerCase.includes(searchValue) && searchValue !== '') {
            fc(item);
        }
    });
}
function selectarrow() {
    var buttons = document.querySelectorAll('.search-list-button');
    let currentIndex = -1;
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            if (currentIndex > -1) {
                buttons[currentIndex].style.background = "#1a1b26";
                currentIndex--;
                if (currentIndex > -1) {
                    buttons[currentIndex].style.background = "#2b2c37";
                }
            }
            else {
                currentIndex = buttons.length - 1;
                if (currentIndex <= buttons.length - 1 && currentIndex > -1) {
                    buttons[currentIndex].style.background = "#2b2c37";
                }
            }
        } else if (event.key === 'ArrowDown') {
            if (currentIndex < buttons.length - 1) {
                if (currentIndex !== -1) {
                    buttons[currentIndex].style.background = "#1a1b26";
                }
                currentIndex++;
                buttons[currentIndex].style.background = "#2b2c37";
            }
            else {
                if(currentIndex > -1 && currentIndex <= buttons.length - 1){
                    buttons[currentIndex].style.background = "#1a1b26";
                }
                currentIndex = -1;
            }
        } else if (event.key === 'Enter' && currentIndex !== -1) {
            buttons[currentIndex].click();
        }
    });
    buttons.forEach((button, index) => {
        button.addEventListener('mouseenter', function () {
            if(currentIndex > -1){
                buttons[currentIndex].style.background = "#1a1b26";
            }
            currentIndex = index;
        });
    });
}
function onclicksearch(button) {
    if (button.innerText === "Counter") {
        var a = document.createElement("a");
        a.href = "CounterLink.html";
        setTimeout(() => {
            a.click();
        }, 100);
    }
    else if (button.innerText === "DraggablePanel") {
        var a = document.createElement("a");
        a.href = "DraggablePanelLink.html";
        setTimeout(() => {
            a.click();
        }, 100);
    }
    else if (button.innerText === "Searcher") {
        var a = document.createElement("a");
        a.href = "SearcherLink.html";
        setTimeout(() => {
            a.click();
        }, 100);
    }
}