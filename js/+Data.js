window.onload = () => {
    gapiLoaded();
    gisLoaded();
}
window.addEventListener('message', (e) => {
    if (e.source === window && e.data && e.data.__command__ === 'console') {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
}, true);
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
        requestcallback();
        tokenClient.requestAccessToken({ prompt: '' });
        const nw = window.open('', '_blank');
        nw.document.write('<html><body>新窗口</body></html>');
        nw.close();
    }
}

function requestcallback() {
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
    };
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
        signinButton.style.display = 'block'
        signoutButton.style.display = 'none'
    }
}

// check for a Private Upload in google drive
function checkFolder() {
    fileutils.ReadFileText('Resource/Register/Private/3jF7D9g2E5h6K1l8.lock', (lock) => {
        gapi.client.drive.files.get({
            'fileId': lock,
            'fields': 'id, name, mimeType'
        }).then(function (response) {
            var file = response.result;
            if (file && file.mimeType === 'application/vnd.google-apps.folder') {
                //console.log('Folder found with ID:', file.id, 'and name:', file.name);
                if (file.id === lock) {
                    console.log('Folder Available');
                    checkUserFolder(file.id);
                }
            } else {
                console.log('Item is not a folder or does not exist with');
            }
        }).catch(function (error) {
            console.error('Error checking folder:', error);
        });
    });
    /*gapi.client.drive.files.list({
        'q': 'name = "Private Upload"',
    }).then(function (response) {
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                localStorage.setItem('parent_folder', file.id);
                console.log('Folder Available');
                // get files if folder available
                //showList();
                checkUserFolder(file.id);
            }
        } else {
            // if folder not available then create
            createFolder();
        }
    })*/
}

function checkUserFolder(parentFolderId) {
    gapi.client.drive.files.list({
        'q': "'" + parentFolderId + "' in parents and mimeType='application/vnd.google-apps.folder' and 'me' in owners",
    }).then(function (response) {
        var userFolders = response.result.files;
        if (userFolders && userFolders.length > 0) {
            // User's folder exists inside "Private Upload"
            var userFolder = userFolders[0]; // Assuming there's only one user folder
            console.log('User folder found:', userFolder.name);
            // Perform actions to show the contents of the user's folder
            // Call a function to display the contents or perform further operations with this folder
            showUserFolderContents(userFolder.id);
        } else {
            // User's folder doesn't exist, create it
            gapi.client.drive.files.get({
                'fileId': localStorage.getItem('parent_folder'),
                'fields': 'id, name, mimeType'
            }).then(function (response) {
                var file = response.result;
                if (file && file.mimeType === 'application/vnd.google-apps.folder') {
                    fileutils.ReadFileText('Resource/Register/Private/3jF7D9g2E5h6K1l8.lock', (lock) => {
                        gapi.client.drive.about.get({
                            'fields': 'user'
                        }).then(function (response) {
                            var currentUser = response.result.user;
                            var userName = currentUser.displayName || currentUser.emailAddress || 'User';
                            gapi.client.drive.files.list({
                                q: "mimeType='application/vnd.google-apps.folder'",
                            }).then(function (response) {
                                var files = response.result.files;
                                if (files && files.length > 0) {
                                    // 檢查每個資料夾是否包含使用者名稱
                                    var folder = files.find(function (file) {
                                        return file.name.includes(userName);
                                    });

                                    if (folder) {
                                        console.log('找到包含 ' + userName + ' 的資料夾。');
                                        console.log('該資料夾的 ID 是:', folder.id);
                                        move(folder.id, lock);
                                    } else {
                                        console.log('未找到包含 ' + userName + ' 的資料夾。');
                                        createUserFolder(parentFolderId);
                                    }
                                } else {
                                    console.log('沒有資料夾存在。');
                                }
                            }).catch(function (err) {
                                console.error('查詢時出現錯誤:', err);
                            });
                        });
                    });
                } else {
                    console.log('Item is not a folder or does not exist with');
                }
            }).catch(function (error) {
                createUserFolder(parentFolderId);
                console.error('Error checking folder:', error);
            });
            function move(folderIdToMove, newParentFolderId) {
                gapi.client.drive.files.update({
                    fileId: folderIdToMove,
                    addParents: newParentFolderId,
                    fields: 'id, parents'
                }).then(function (response) {
                    console.log('成功移動資料夾:', response.result);
                    showUserFolderContents(folderIdToMove);
                }).catch(function (err) {
                    console.error('移動資料夾時出現錯誤:', err);
                });
            }
        }
    });
}

function showUserFolderContents(userFolderId) {
    // Fetch and display the contents of the user's folder here
    // Use the userFolderId to list the contents or perform operations
    console.log('Showing contents of user folder with ID:', userFolderId);
    if (paramname.getParameterByName('v', window.location.href) !== 'user') {
        localStorage.setItem('parent_folder', userFolderId);
        showList();
        initlistfiles();
        getcreatetime();
        initordermenu();
    }
    else {
        share_initlistfiles(); //share_getcreatetime();
        initordermenu();
    }
}

function createUserFolder(parentFolderId) {
    gapi.client.drive.about.get({
        'fields': 'user'
    }).then(function (response) {
        var currentUser = response.result.user;
        var userName = currentUser.displayName || currentUser.emailAddress || 'User'; // Use the user's display name or email

        // Create the user's folder inside "Private Upload" and name it with the user's name
        gapi.client.drive.files.create({
            'resource': {
                'name': userName,
                'parents': [parentFolderId],
                'mimeType': 'application/vnd.google-apps.folder'
            }
        }).then(function (response) {
            var userFolder = response.result;
            console.log('User folder created:', userFolder.name);

            // Update the created folder's name with folder ID appended
            var fileId = userFolder.id;
            var updatedFolderName = userName + "_" + fileId;

            gapi.client.drive.files.update({
                'fileId': fileId,
                'resource': {
                    'name': updatedFolderName
                },
                'fields': 'id, name'
            }).then(function (response) {
                console.log('Folder name updated with folder ID:', updatedFolderName);
                // Perform actions after updating folder name if needed
            }).catch(function (error) {
                console.error('Error updating folder name:', error);
            });

            // Disable sharing for the created folder
            var fileId = userFolder.id;
            var permissionMetadata = {
                'role': 'reader', // Set the role to 'reader' or 'writer' as needed
                'type': 'anyone',
                'allowFileDiscovery': false
            };

            gapi.client.drive.permissions.create({
                'fileId': fileId,
                'resource': permissionMetadata,
                'fields': 'id'
            }).then(function (response) {
                console.log('Sharing disabled for the folder:', userFolder.name);
                // Perform actions after disabling sharing if needed
                if (paramname.getParameterByName('v', window.location.href) !== 'user') {
                    localStorage.setItem('parent_folder', fileId);

                    showList();
                    initlistfiles();
                    getcreatetime();
                    initordermenu();
                }
                else {
                    share_initlistfiles(); //share_getcreatetime();
                    initordermenu();
                }
            }).catch(function (error) {
                console.error('Error disabling sharing:', error);
            });
        }).catch(function (error) {
            console.error('Error creating folder:', error);
        });
    });
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
            expandContainer.style.top = (click_position.top + window.scrollY) - 200 + 'px';
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
    if (paramname.getParameterByName('v', window.location.href) !== 'user') {
        check(`'${localStorage.getItem('parent_folder')}' in parents`);
    }
    function check(q) {
        gapi.client.drive.files.list({
            // get parent folder id from localstorage
            'q': q,
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
                updateBtn.innerHTML = '⇮';
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
            updateBtn.innerHTML = '⇮';
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
        } else if (condition == 'rename') {
            v.innerHTML = 'Rename';
            var updateBtn = document.getElementsByClassName('upload')[0];
            updateBtn.innerHTML = '↻';
            document.querySelector('textarea').value = name;
            updateBtn.addEventListener("click", () => {
                updateBtn.style.visibility = "hidden";
                document.querySelector('textarea').readOnly = true;
                document.querySelector('textarea').style.background = "#ccc";
                document.getElementById("loadarrow").style.display = "block";
            });
            updateBtn.setAttribute('onClick', "rename(document.querySelector('textarea').value)");
            document.querySelector('textarea').setAttribute('data-update-id', id);
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
    })
        .then(response => {
            if (response.status === 403) {
                document.getElementById('checksave').style.display = "none";
                var recordfilename = document.getElementById('filename').innerHTML;
                document.getElementById('filename').innerHTML = "⚠️存取權限不足上傳失敗";
                document.getElementById('filename').style.color = "red";
                setTimeout(() => {
                    document.getElementById('filename').innerHTML = recordfilename;
                    document.getElementById('filename').style = "";
                    initlistfiles();
                    getcreatetime();
                    showList();
                }, 2000);

                // Handle 403 Forbidden error
                console.error('403 Forbidden error occurred');
                // Perform actions to handle the Forbidden error, such as displaying an error message
            } else {
                // Continue processing the response as needed
                return response.json(); // or response.text() based on the response type
            }
        })
        .then(value => {
            if (value.status !== 403) {
                initlistfiles();
                getcreatetime();
                console.log('File updated successfully');
                //document.querySelector('textarea').setAttribute('data-update-id', '');
                var updateBtn = document.getElementsByClassName('upload')[0];
                updateBtn.innerHTML = '⇮';
                //updateBtn.innerHTML = '✚';
                updateBtn.style.visibility = "";
                document.querySelector('textarea').readOnly = false;
                document.querySelector('textarea').style.background = "";
                document.getElementById("loadarrow").style.display = "none";
                //updateBtn.setAttribute('onClick', 'uploaded()');

                document.getElementById("checksave").style.display = "none";
                document.querySelector('textarea').placeholder = "Enter text ...";
                window.onbeforeunload = null;
            }
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

function rename(v) {
    var updateId = document.querySelector('textarea').getAttribute('data-update-id');
    gapi.client.drive.files.update({
        fileId: updateId,
        name: v
    }).then(function (response) {
        console.log('成功更改檔案名稱:', response.result);
        document.getElementById('filename').innerHTML = v;
        var updateBtn = document.getElementsByClassName('upload')[0];
        updateBtn.innerHTML = '✚';
        updateBtn.setAttribute('onClick', 'upload()');
        document.querySelector('textarea').readOnly = false;
        showList();
    }).catch(function (err) {
        console.error('更改檔案名稱時出現錯誤:', err);
    });
}

async function share_initlistfiles() {
    fileutils.ReadFileText('Resource/Register/Private/3jF7D9g2E5h6K1l8.lock', (lock) => {
        check(`'${lock}' in parents`);
        async function check(q) {
            document.getElementById('content').innerHTML = null;
            let response;
            try {
                response = await gapi.client.drive.files.list({
                    'q': q,
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
                listAllFilesInFolder(files[i].id, i);
            }

            function listAllFilesInFolder(folderId, i) {
                gapi.client.drive.files.list({
                    'q': `'${folderId}' in parents`,
                    'fields': 'files(id, name, mimeType)', // Specify the fields you want to retrieve
                    'orderBy': listorder
                }).then(function (response) {
                    var files = response.result.files;
                    if (files && files.length > 0) {
                        console.log('Files found in folder:', folderId);
                        files.forEach(function (file) {
                            //console.log(file.name, file.id, file.mimeType);
                            if (file.mimeType === 'application/vnd.google-apps.folder') {
                                // If it's a folder, recursively list its contents
                                listAllFilesInFolder(file.id);
                            } else {
                                // If it's a file, do something with it (you can log, process, or store the file information)
                                //console.log('File:', file.name);
                                gapi.client.drive.files.get({
                                    fileId: file.id,
                                    alt: 'media'
                                }).then(function (res) {
                                    gapi.client.drive.files.get({
                                        'fileId': file.id,
                                        'fields': 'modifiedTime,lastModifyingUser,createdTime'
                                    }).then(function (response) {
                                        document.getElementById('content').innerHTML += "<span title=\"" + "最後編輯: " + response.result.lastModifyingUser.displayName + "上次修改時間: " + new Date(response.result.modifiedTime).toLocaleString() + "\"" + "class=\"contentbody\"" + ">" + decodeUTF8(res.body) + "</span>" + "\n";
                                        document.getElementById('content').innerHTML += "<span class=\"createtimebody\">" + "建立日期:" + new Date(response.result.createdTime).toLocaleString() + "</span>" + "\n";
                                        showList();
                                    }, function (err) {
                                        console.error('Error getting file details:', err);
                                    });
                                });
                            }
                        });
                    } else {
                        console.log('No files found in folder:', folderId);
                    }
                }).catch(function (error) {
                    console.error('Error listing files in folder:', error);
                });
            }
        }
    });
}
async function share_getcreatetime() {
    fileutils.ReadFileText('Resource/Register/Private/3jF7D9g2E5h6K1l8.lock', (lock) => {
        check(`'${lock}' in parents`);
        async function check(q) {
            let response;
            try {
                response = await gapi.client.drive.files.list({
                    'q': q,
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
                listAllFilesInFolder(files[i].id, i);
            }
            function listAllFilesInFolder(folderId, i) {
                gapi.client.drive.files.list({
                    'q': `'${folderId}' in parents`,
                    'fields': 'files(id, name, mimeType)' // Specify the fields you want to retrieve
                }).then(function (response) {
                    var files = response.result.files;
                    if (files && files.length > 0) {
                        //console.log('Files found in folder:', folderId);
                        files.forEach(function (file, index) {
                            //console.log(file.name, file.id, file.mimeType);
                            if (file.mimeType === 'application/vnd.google-apps.folder') {
                                // If it's a folder, recursively list its contents
                                //listAllFilesInFolder(file.id);
                            } else {
                                // If it's a file, do something with it (you can log, process, or store the file information)
                                //console.log('File:', file.name);
                                gapi.client.drive.files.get({
                                    'fileId': file.id,
                                    'fields': 'createdTime'
                                }).then(function (response) {
                                    document.getElementById('content').innerHTML += "<span class=\"createtimebody\" style=\"order: " + (i + i + index + 1) + "\">" + "建立日期:" + new Date(response.result.createdTime).toLocaleString() + "</span>" + "\n";
                                }, function (err) {
                                    console.error('Error getting file details:', err);
                                });
                                // Here you can perform actions with the file
                            }
                        });
                    } else {
                        console.log('No files found in folder:', folderId);
                    }
                }).catch(function (error) {
                    console.error('Error listing files in folder:', error);
                });
            }
        }
    });
}
async function initlistfiles() {
    check(`'${localStorage.getItem('parent_folder')}' in parents`);
    async function check(q) {
        document.getElementById('content').innerHTML = null;
        let response;
        try {
            response = await gapi.client.drive.files.list({
                'q': q,
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
                    gapi.client.drive.files.get({
                        'fileId': files[i].id,
                        'fields': 'lastModifyingUser'
                    }).then(function (resuser) {
                        let lastModifyingUser = resuser.result.lastModifyingUser;
                        if (lastModifyingUser) {
                            document.getElementById('content').innerHTML += "<span title=\"" + "最後編輯: " + lastModifyingUser.displayName + "上次修改時間: " + new Date(response.result.modifiedTime).toLocaleString() + "\"" + "class=\"contentbody\" style=\"order: " + (i + i) + "\">" + decodeUTF8(res.body) + "</span>" + "\n";
                            showList();
                        } else {
                            console.log('Last Modifying User not found.');
                        }
                    }).catch(function (err) {
                        console.error('Error getting file info:', err);
                    });
                }, function (err) {
                    console.error('Error getting file details:', err);
                });
            });
        }
    }
}
async function getcreatetime() {
    check(`'${localStorage.getItem('parent_folder')}' in parents`);
    async function check(q) {
        let response;
        try {
            response = await gapi.client.drive.files.list({
                'q': q,
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
}

function initordermenu() {
    var p = document.getElementById("ordermenu");

    var clickindex = { value: 4 };
    defineproperty(clickindex, 'value', 'valueChanged');

    clickindex.value = 4;
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
            onclickbtn(c, order_createTimeRE, 1);
            quickshort(c, 1);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("建立時間 ⇈", (c) => {
            onclickbtn(c, order_createTime, 2);
            quickshort(c, 2);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("上次修改時間 ⇈", (c) => {
            onclickbtn(c, order_modifiedTimeRE, 3);
            quickshort(c, 3);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("上次修改時間 ⇊", (c) => {
            onclickbtn(c, order_modifiedTime, 4);
            quickshort(c, 4);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱 ⇊", (c) => {
            onclickbtn(c, order_nameRE, 5);
            quickshort(c, 5);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱 ⇈", (c) => {
            onclickbtn(c, order_name, 6);
            quickshort(c, 6);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱(0~9) ⇊", (c) => {
            onclickbtn(c, order_name_natureRE, 7);
            quickshort(c, 7);
            c.style.fontFamily = '"Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif';
        });
        contextmenuutils.addItem("名稱(0~9) ⇈", (c) => {
            onclickbtn(c, order_name_nature, 8);
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
    function onclickbtn(c, lo, clickvalue) {
        c.addEventListener("click", () => {
            listorder = lo;
            clickindex.value = clickvalue;
            refreshlist();
            c.style.background = "#d56";
            c.addEventListener("mouseenter", () => {
                c.style.background = "#e67";
            });
            c.addEventListener("mouseleave", () => {
                c.style.background = "#d56";
            });
            contextmenuutils.remove();
        });
    }
    function refreshlist() {
        if (paramname.getParameterByName('v', window.location.href) !== 'user') {
            initlistfiles();
            getcreatetime();
            showList();
        }
        else {
            share_initlistfiles(); //share_getcreatetime();
        }
    }
}
window.addEventListener('load', function () {
    var popupTest = window.open('https://accounts.google.com/o/oauth2/v2/auth?gsiwebsdk=3&client_id=759707094526-rbodqs1pg8r2a8igkvstf05dnrrp17gb.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&redirect_uri=storagerelay%3A%2F%2Fhttp%2F127.0.0.1%3A5500%3Fid%3Dauth411334&response_type=token&include_granted_scopes=true&enable_granular_consent=true');
    if (!popupTest || popupTest.closed || typeof popupTest.closed == 'undefined') {
        document.querySelectorAll('.nav-item')[1].style.display = "";
        document.getElementById('signin').style.display = "";
        console.log("popup WINDOW ban by user");
    } else {
        console.log("popup WINDOW SUCCESS to open!");
        popupTest.close();
    }
});