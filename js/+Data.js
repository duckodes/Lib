window.onload = () => {
    gapiLoaded();
    gisLoaded();
}

var CLIENT_ID = '759707094526-rbodqs1pg8r2a8igkvstf05dnrrp17gb.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBKBn3FbJyLj8z60Qcrdaxgm-HZMAAllVo';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
var signinButton = document.getElementById('signin');
var signoutButton = document.getElementById('signout');
let tokenClient;
let gapiInited = false;
let gisInited = false;
var isupload = true;

//ORDER
var listorder = 'folder,modifiedTime desc,name';
var order_createTime = 'createdTime';
var order_createTimeRE = 'createdTime desc';
var order_modifiedTime = 'modifiedTime';
var order_modifiedTimeRE = 'modifiedTime desc';
var order_name = 'name';
var order_nameRE = 'name desc';
var order_name_nature = 'name_natural';
var order_name_natureRE = 'name_natural desc';

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
    });
    gapiInited = true;
    maybeEnableButtons();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: ''
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        signinButton.style.display = 'block';
        fileutils.ReadFileText('Resource/Register/localstorage.high-level/7Rm5Np9AqL3tEw2F.localstorage', (t) => {
            gapi.client.setToken(localStorage.getItem(t));
            autologin();
        });
    }
}
function autologin() {
    const token = gapi.client.getToken();
    if (token !== null) {
        handleAuthClick();
    }
}

signinButton.onclick = () => handleAuthClick()
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        signinButton.style.display = 'none'
        signoutButton.style.display = 'block'
        checkFolder();
        document.querySelector('textarea').addEventListener('input', function () {
            if (document.querySelector('textarea').value.trim() !== '') {
                document.getElementById("checksave").style.display = "block";
                window.onbeforeunload = function () {
                    return "您確定要離開嗎？";
                };
            }
        });
        fileutils.ReadFileText('Resource/Register/localstorage.high-level/7Rm5Np9AqL3tEw2F.localstorage', (t) => {
            localStorage.setItem(t, gapi.client.getToken());
        });
        await initlistfiles();
        await getcreatetime();
        initordermenu();
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

signoutButton.onclick = () => handleSignoutClick()
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        fileutils.ReadFileText('Resource/Register/localstorage.high-level/7Rm5Np9AqL3tEw2F.localstorage', (t) => {
            localStorage.removeItem(t);
        });
        signinButton.style.display = 'block'
        signoutButton.style.display = 'none'
    }
}

// check for a Private Upload in google drive
function checkFolder() {
    gapi.client.drive.files.list({
        'q': 'name = "Private Upload"',
    }).then(function (response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                localStorage.setItem('parent_folder', file.id);
                console.log('Folder Available');
                // get files if folder available
                showList();
            }
        } else {
            // if folder not available then create
            createFolder();
        }
    })
}

// now create a function to upload file
function upload() {
    var text = document.querySelector('textarea');
    if (text.value != "") {
        const blob = new Blob([text.value], { type: 'plain/text' });
        // get parent folder id from localstorage
        const parentFolder = localStorage.getItem('parent_folder');
        var twoWords = text.value.split(' ')[0] + '-' + text.value.split(' ')[1];
        // set file metadata
        var metadata = {
            // get first two words from the input text and set as file name instead of backup-file
            name: twoWords + '-' + String(Math.random() * 10000).split('.')[0] + '.txt',
            mimeType: 'plain/text',
            parents: [parentFolder]
        };
        var formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append("file", blob);
        var updateBtn = document.getElementsByClassName('upload')[0];
        updateBtn.style.visibility = "hidden";
        document.querySelector('textarea').style.background = "#ccc";
        document.getElementById("loadarrow").style.display = "block";
        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: 'POST',
            headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
            body: formData
        }).then(function (response) {
            return response.json();
        }).then(function (value) {
            console.log(value);
            // also update list on file upload
            isupload = false;
            initlistfiles();
            getcreatetime();
            showList();
        });
    }
    else {
        document.getElementById('filename').innerHTML = "未輸入文字!";
        document.getElementById('filename').style.color = "red";
        setTimeout(() => {
            document.getElementById('filename').innerHTML = "";
            document.getElementById('filename').style = "";
        }, 2000);
    }
}

function createFolder() {
    var access_token = gapi.auth.getToken().access_token;
    var request = gapi.client.request({
        'path': 'drive/v2/files',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        'body': {
            'title': 'Private Upload',
            'mimeType': 'application/vnd.google-apps.folder'
        }
    });
    request.execute(function (response) {
        localStorage.setItem('parent_folder', response.id);
    })
}

var expandContainer = document.querySelector('.expand-container');
var expandContainerUl = document.querySelector('.expand-container ul');
var listcontainer = document.querySelector('.list ul');
// create a function to show hide options
function expand(v) {
    var click_position = v.getBoundingClientRect();
    if (expandContainer.style.display == 'block') {
        expandContainer.style.display = 'none';
        expandContainerUl.setAttribute('data-id', '');
        expandContainerUl.setAttribute('data-name', '');
        window.removeEventListener("click", winclick);
    } else {
        window.addEventListener("click", winclick);
        setTimeout(() => {
            expandContainer.style.display = 'block';
            expandContainer.style.left = (click_position.left + window.scrollX) - 95 + 'px';
            expandContainer.style.top = (click_position.top + window.scrollY) - 150 + 'px';
            // get data name & id and store it to the options
            expandContainerUl.setAttribute('data-id', v.parentElement.getAttribute('data-id'));
            expandContainerUl.setAttribute('data-name', v.parentElement.getAttribute('data-name'));
        }, 1);
    }
}
function winclick(e) {
    if (e.target !== expandContainer) {
        if (expandContainer.style.display == 'block') {
            expandContainer.style.display = 'none';
            expandContainerUl.setAttribute('data-id', '');
            expandContainerUl.setAttribute('data-name', '');
            window.removeEventListener("click", winclick);
        }
    }
}

// function for files list
function showList() {
    gapi.client.drive.files.list({
        // get parent folder id from localstorage
        'q': `parents in "${localStorage.getItem('parent_folder')}"`,
        'orderBy': listorder
    }).then(function (response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            listcontainer.innerHTML = '';
            for (var i = 0; i < files.length; i++) {
                listcontainer.innerHTML += `
                
                <li data-id="${files[i].id}" data-name="${files[i].name}">
                <span>${files[i].name}</span>
                <svg id="exbtn" onclick="expand(this)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
                </li>
                
                `;
            }
        } else {
            listcontainer.innerHTML = '<div style="text-align: center;">No Files</div>'
        }
        var updateBtn = document.getElementsByClassName('upload')[0];
        updateBtn.style.visibility = "";
        document.querySelector('textarea').style.background = "";
        document.getElementById("loadarrow").style.display = "none";
        if (!isupload) {
            updateBtn.innerHTML = '↻';
            updateBtn.setAttribute('onClick', 'update()');
            document.querySelector('textarea').setAttribute('data-update-id', files[0].id);
            document.getElementById('filename').innerHTML = files[0].name;
            document.querySelector('textarea').readOnly = false;
            document.getElementById("checksave").style.display = "none";
            document.querySelector('textarea').placeholder = "Enter text ...";
            window.onbeforeunload = null;
            isupload = true;
        }
    })
}
function decodeUTF8(encodedString) {
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}
function readEditDownload(v, condition) {
    document.querySelector('textarea').readOnly = true;
    document.querySelector('textarea').style.background = "#aaa";
    document.getElementById("loadarrow").style.display = "block";
    var id = v.parentElement.getAttribute('data-id');
    var name = v.parentElement.getAttribute('data-name');
    v.innerHTML = '...';
    gapi.client.drive.files.get({
        fileId: id,
        alt: 'media'
    }).then(function (res) {
        document.querySelector('textarea').readOnly = false;
        document.querySelector('textarea').style.background = "";
        document.getElementById("loadarrow").style.display = "none";
        expandContainer.style.display = 'none';
        document.getElementById('filename').innerHTML = name;
        expandContainerUl.setAttribute('data-id', '');
        expandContainerUl.setAttribute('data-name', '');
        if (condition == 'read') {
            v.innerHTML = 'Read';
            document.querySelector('textarea').value = decodeUTF8(res.body);
            document.documentElement.scrollTop = 0;
            console.log('Read Now')

            var updateBtn = document.getElementsByClassName('upload')[0];
            updateBtn.innerHTML = '✚';
            document.getElementById('filename').innerHTML = "";
            updateBtn.setAttribute('onClick', 'upload()');
            document.getElementById("checksave").style.display = "block";
            document.querySelector('textarea').placeholder = "Enter file name ...";
            window.onbeforeunload = function () {
                return "您確定要離開嗎？";
            };
        } else if (condition == 'edit') {
            v.innerHTML = 'Edit';
            document.querySelector('textarea').value = decodeUTF8(res.body);
            document.documentElement.scrollTop = 0;
            var updateBtn = document.getElementsByClassName('upload')[0];
            updateBtn.innerHTML = '↻';
            // we will make the update function later
            updateBtn.addEventListener("click", () => {
                updateBtn.style.visibility = "hidden";
                document.querySelector('textarea').readOnly = true;
                document.querySelector('textarea').style.background = "#ccc";
                document.getElementById("loadarrow").style.display = "block";
            });
            updateBtn.setAttribute('onClick', 'update()');
            document.querySelector('textarea').setAttribute('data-update-id', id);
            console.log('File ready for update');

            updateBtn.style.visibility = "";
            document.querySelector('textarea').readOnly = false;
            document.getElementById("checksave").style.display = "none";
            document.querySelector('textarea').placeholder = "Enter text ...";
            window.onbeforeunload = null;
        } else {
            v.innerHTML = 'Download';
            var blob = new Blob([decodeUTF8(res.body)], { type: 'plain/text' });
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = name;
            a.click();
        }
    })
}

// new create update function
function update() {
    document.querySelector('textarea').style.background = "#ccc";
    document.getElementById("loadarrow").style.display = "block";
    var updateId = document.querySelector('textarea').getAttribute('data-update-id');
    var url = 'https://www.googleapis.com/upload/drive/v3/files/' + updateId + '?uploadType=media';
    fetch(url, {
        method: 'PATCH',
        headers: new Headers({
            Authorization: 'Bearer ' + gapi.auth.getToken().access_token,
            'Content-type': 'plain/text'
        }),
        body: document.querySelector('textarea').value
    }).then(value => {
        initlistfiles();
        getcreatetime();
        console.log('File updated successfully');
        //document.querySelector('textarea').setAttribute('data-update-id', '');
        var updateBtn = document.getElementsByClassName('upload')[0];
        updateBtn.innerHTML = '↻';
        //updateBtn.innerHTML = '✚';
        updateBtn.style.visibility = "";
        document.querySelector('textarea').readOnly = false;
        document.querySelector('textarea').style.background = "";
        document.getElementById("loadarrow").style.display = "none";
        //updateBtn.setAttribute('onClick', 'uploaded()');

        document.getElementById("checksave").style.display = "none";
        document.querySelector('textarea').placeholder = "Enter text ...";
        window.onbeforeunload = null;
    }).catch(err => console.error(err))
}

function deleteFile(v) {
    if (document.querySelector('textarea').getAttribute('data-update-id') !== expandContainerUl.getAttribute('data-id')) {
        var id = v.parentElement.getAttribute('data-id');
        v.innerHTML = '...';
        var request = gapi.client.drive.files.delete({
            'fileId': id
        });
        request.execute(function (res) {
            console.log('File Deleted');
            v.innerHTML = 'Delete';
            expandContainer.style.display = 'none';
            expandContainerUl.setAttribute('data-id', '');
            expandContainerUl.setAttribute('data-name', '');

            var updateBtn = document.getElementsByClassName('upload')[0];
            updateBtn.innerHTML = '✚';
            updateBtn.setAttribute('onClick', 'upload()');
            document.getElementById('filename').innerHTML = "";
            document.getElementById("checksave").style.display = "block";
            document.querySelector('textarea').placeholder = "Enter file name ...";
            window.onbeforeunload = function () {
                return "您確定要離開嗎？";
            };

            // after delete update the list
            initlistfiles();
            getcreatetime();
            showList();
        })
    }
    else {
        var id = v.parentElement.getAttribute('data-id');
        v.innerHTML = '...';
        var request = gapi.client.drive.files.delete({
            'fileId': id
        });
        request.execute(function (res) {
            console.log('File Deleted');
            v.innerHTML = 'Delete';
            expandContainer.style.display = 'none';
            expandContainerUl.setAttribute('data-id', '');
            expandContainerUl.setAttribute('data-name', '');

            var updateBtn = document.getElementsByClassName('upload')[0];
            updateBtn.innerHTML = '✚';
            updateBtn.setAttribute('onClick', 'upload()');
            document.getElementById('filename').innerHTML = "";
            document.getElementById("checksave").style.display = "block";
            document.querySelector('textarea').placeholder = "Enter file name ...";
            window.onbeforeunload = function () {
                return "您確定要離開嗎？";
            };

            // after delete update the list
            initlistfiles();
            getcreatetime();
            showList();
        })
    }
}

async function initlistfiles() {
    document.getElementById('content').innerHTML = null;
    let response;
    try {
        response = await gapi.client.drive.files.list({
            'q': `parents in "${localStorage.getItem('parent_folder')}"`,
            'pageSize': 10,
            'fields': 'files(id, name)',
            'orderBy': listorder
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
        document.getElementById('content').innerText = 'No files found.';
        return;
    }
    // Flatten to string to display
    /*const output = files.reduce(
        (str, file) => `${str}${file.name} (${file.id})\n`,
        'Files:\n');
    document.getElementById('content').innerText = output;*/

    for (let i = 0; i < files.length; i++) {
        gapi.client.drive.files.get({
            fileId: files[i].id,
            alt: 'media'
        }).then(function (res) {
            gapi.client.drive.files.get({
                'fileId': files[i].id,
                'fields': 'modifiedTime'
            }).then(function (response) {
                document.getElementById('content').innerHTML += "<span title=\"" + "上次修改時間: " + new Date(response.result.modifiedTime).toLocaleString() + "\"" + "class=\"contentbody\" style=\"order: " + (i + i) + "\">" + decodeUTF8(res.body) + "</span>" + "\n";
                showList();
            }, function (err) {
                console.error('Error getting file details:', err);
            });
        });
    }
}
async function getcreatetime() {
    let response;
    try {
        response = await gapi.client.drive.files.list({
            'q': `parents in "${localStorage.getItem('parent_folder')}"`,
            'pageSize': 10,
            'fields': 'files(id, name)',
            'orderBy': listorder
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
        document.getElementById('content').innerText = 'No files found.';
        return;
    }
    for (let i = 0; i < files.length; i++) {
        gapi.client.drive.files.get({
            'fileId': files[i].id,
            'fields': 'createdTime'
        }).then(function (response) {
            document.getElementById('content').innerHTML += "<span class=\"createtimebody\" style=\"order: " + (i + i + 1) + "\">" + "建立日期:" + new Date(response.result.createdTime).toLocaleString() + "</span>" + "\n";
        }, function (err) {
            console.error('Error getting file details:', err);
        });
    }
}

function initordermenu() {
    var p = document.getElementById("ordermenu");

    var clickindex = { value: 3 };
    defineproperty(clickindex, 'value', 'valueChanged');

    clickindex.value = 3;
    p.addEventListener("click", () => {
        contextmenuutils.init(p.parentElement, (b, c) => {
            c.style.zIndex = "999";
        });
        contextmenuutils.addItem("返回", (c) => {
            c.addEventListener("click", () => {
                window.location.href = "UGPrivateLibrary.html";
            });
            c.addEventListener("mouseenter", () => {
                c.style.background = "#202020";
            });
            c.addEventListener("mouseleave", () => {
                c.style.background = "";
            });
        });
        contextmenuutils.addItem("排序", (c) => {
            c.style.cursor = "";
        });
        contextmenuutils.addItem("建立時間 ⇊", (c) => {
            c.addEventListener("click", () => {
                listorder = order_createTimeRE;
                clickindex.value = 1;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 1);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("建立時間 ⇈", (c) => {
            c.addEventListener("click", () => {
                listorder = order_createTime;
                clickindex.value = 2;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 2);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("上次修改時間 ⇈", (c) => {
            c.addEventListener("click", () => {
                listorder = order_modifiedTimeRE;
                clickindex.value = 3;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 3);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("上次修改時間 ⇊", (c) => {
            c.addEventListener("click", () => {
                listorder = order_modifiedTime;
                clickindex.value = 4;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 4);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱 ⇊", (c) => {
            c.addEventListener("click", () => {
                listorder = order_nameRE;
                clickindex.value = 5;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 5);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱 ⇈", (c) => {
            c.addEventListener("click", () => {
                listorder = order_name;
                clickindex.value = 6;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 6);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱(0~9) ⇊", (c) => {
            c.addEventListener("click", () => {
                listorder = order_name_natureRE;
                clickindex.value = 7;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 7);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱(0~9) ⇈", (c) => {
            c.addEventListener("click", () => {
                listorder = order_name_nature;
                clickindex.value = 8;
                initlistfiles();
                getcreatetime();
                showList();
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
                contextmenuutils.remove();
            });
            quickshort(c, 8);
            c.style.marginBottom = "20px";
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
    });
    function quickshort(c, index) {
        if (clickindex.value !== index) {
            c.addEventListener("mouseenter", () => {
                c.style.background = "#202020";
            });
            c.addEventListener("mouseleave", () => {
                c.style.background = "";
            });
        }
        else {
            c.style.background = "#d56";
            c.addEventListener("mouseenter", () => {
                c.style.background = "#e67";
            });
            c.addEventListener("mouseleave", () => {
                c.style.background = "#d56";
            });
        }
        valuechangeevent('valueChanged', (v) => {
            if (clickindex.value !== index) {
                c.style.background = "";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#202020";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "";
                });
            }
            else {
                c.style.background = "#d56";
                c.addEventListener("mouseenter", () => {
                    c.style.background = "#e67";
                });
                c.addEventListener("mouseleave", () => {
                    c.style.background = "#d56";
                });
            }
        });
    }
    function defineproperty(obj, propertykey, eventstring) {
        Object.defineProperty(obj, propertykey, {
            get: function () {
                return this._value;
            },
            set: function (newValue) {
                if (this._value !== newValue) {
                    this._value = newValue;
                    const event = new CustomEvent(eventstring, { detail: newValue });
                    window.dispatchEvent(event);
                }
            }
        });
    }
    function valuechangeevent(eventstring, fc) {
        window.addEventListener(eventstring, function (event) {
            fc(event.detail);
        });
    }
}