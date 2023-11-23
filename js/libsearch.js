/**
 * [Reference]
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * @version 1.0.0
 */
var libsearch = (function () {
    return {
        init: init
    };
    function init() {
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
        var source = ["AudioCollection", "Counter", "DraggablePanel", "InitializationEvent", "MenuGeneric", "Searcher", "Timer", "UI-Sizer"];
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
                    onclicksearch(button.innerText);
                });
                searchbuttonarea.appendChild(button);
                LibTags(button);
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
        searchbar.addEventListener("click", () => {
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
                    onclicksearch(button.innerText);
                });
                searchbuttonarea.appendChild(button);
                LibTags(button);
            });
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
                            searchbar.value = buttons[currentIndex].innerText;
                        }
                    }
                    else {
                        currentIndex = buttons.length - 1;
                        if (currentIndex <= buttons.length - 1 && currentIndex > -1) {
                            buttons[currentIndex].style.background = "#2b2c37";
                            searchbar.value = buttons[currentIndex].innerText;
                        }
                    }
                } else if (event.key === 'ArrowDown') {
                    if (currentIndex < buttons.length - 1) {
                        if (currentIndex !== -1) {
                            buttons[currentIndex].style.background = "#1a1b26";
                        }
                        currentIndex++;
                        buttons[currentIndex].style.background = "#2b2c37";
                        searchbar.value = buttons[currentIndex].innerText;
                    }
                    else {
                        if (currentIndex > -1 && currentIndex <= buttons.length - 1) {
                            buttons[currentIndex].style.background = "#1a1b26";
                        }
                        currentIndex = -1;
                    }
                } else if (event.key === 'Enter') {
                    if (document.activeElement.className === "search-bar") {
                        //if (currentIndex !== -1) {
                        //buttons[currentIndex].click();
                        //}
                        onclicksearch(searchbar.value);
                    }
                }
            });
            buttons.forEach((button, index) => {
                button.addEventListener('mouseenter', function () {
                    if (currentIndex > -1 && currentIndex != index) {
                        buttons[currentIndex].style.background = "#1a1b26";
                    }
                    currentIndex = index;
                    //searchbar.value = buttons[currentIndex].innerText;
                });
            });
        }
        function LibTags(b) {
            if (b.textContent === "AudioCollection") {
                engine();
            }
            else if (b.textContent === "Counter") {
                engine();
            }
            else if (b.textContent === "DraggablePanel") {
                engine();
            }
            else if (b.textContent === "InitializationEvent") {
                engine();
            }
            else if (b.textContent === "MenuGeneric") {
                poco();
            }
            else if (b.textContent === "Searcher") {
                engine(); poco();
            }
            else if (b.textContent === "Timer") {
                poco();
            }
            else if (b.textContent === "UI-Sizer") {
                engine();
            }
            function engine() {
                b.innerHTML += "&nbsp;&nbsp;";
                libtags.Addlibtag({ textContent: "#Engine", color: "#cfffff", backgroundColor: "#28d", parent: b });
            }
            function editor() {
                b.innerHTML += "&nbsp;&nbsp;";
                libtags.Addlibtag({ textContent: "#Editor", color: "#cfffff", backgroundColor: "#28d", parent: b });
            }
            function poco() {
                //"Plain Old C# Object" (POCO)
                b.innerHTML += "&nbsp;&nbsp;";
                libtags.Addlibtag({ textContent: "#POCO", color: "#cfffff", backgroundColor: "#28d", parent: b });
            }
        }
        function onclicksearch(Text) {
            var a = document.createElement("a");
            if (Text.replace("  #Engine", "") === "AudioCollection" ||
                Text.replace("  #Engine", "") === "Counter" ||
                Text.replace("  #Engine", "") === "DraggablePanel" ||
                Text.replace("  #Engine", "") === "InitializationEvent" ||
                Text.replace("  #POCO", "") === "MenuGeneric" ||
                Text.replace("  #Engine  #POCO", "") === "Searcher" ||
                Text.replace("  #POCO", "") === "Timer" ||
                Text.replace("  #Engine", "") === "UI-Sizer") {
                a.href = "UnityLibrary.html" + "?v=" + searchbar.value;
                setTimeout(() => {
                    a.click();
                }, 100);
            }
            else {
                a.href = "PrivateLibraryUnlink.html" + "?v=" + searchbar.value;
                setTimeout(() => {
                    a.click();
                }, 100);
            }
        }
        function searchbarinit(){
            if (window.location.pathname !== "/UGPrivateLibrary.html" && window.location.pathname !== "/Profolio/UGPrivateLibrary.html") {
                searchbar.value = paramname.getParameterByName('v', window.location.href);
                document.title = searchbar.value;
            }
        }
        searchbarinit();
    }
}());
libsearch.init();