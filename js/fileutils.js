/**
 * [Reference]
 * 
 * [main.html](../main.html)
 * 
 * [Paint.html](../Paint.html)
 * 
 * [PrivateLibraryUnlink.html](../PrivateLibraryUnlink.html)
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * [UnityLibrary.html](../UnityLibrary.html)
 * 
 * [UploadDaily.html](../UploadDaily.html)
 * 
 * [uploaddaily.js](uploaddaily.js)
 * 
 * [themepackage.js](themepackage.js)
 * 
 * [mainlogin.js](mainlogin.js)
 * 
 * [loginpanel.js](loginpanel.js)
 * 
 * [limitlibs.js](limitlibs.js)
 * 
 * [limitlib.js](limitlib.js)
 * 
 * [libsources.js](libsources.js)
 * 
 * [liboption.js](liboption.js)
 * 
 * [libdocument.js](libdocument.js)
 * 
 * @version 1.1.0
 */
var fileutils = (function (){
    return{
        ReadFileText: ReadFileText,
        ReadFilesText: ReadFilesText,
        filetextinelement: filetextinelement,
        filetextinelements: filetextinelements,
        download: download,
        downloadwriter: downloadwriter
    };
    function ReadFileText(filePath, fc) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fileError');
                }
                return response.text();
            })
            .then(text => {
                fc(text);
            })
            .catch(error => {
                console.error(error);
            });
    }
    function ReadFilesText(urls, fc) {
        const requests = urls.map(url => fetch(url));
    
        Promise.all(requests)
            .then(responses => Promise.all(responses.map(response => response.text())))
            .then(data => {
                data.forEach((content, index) => {
                    fc(content, index);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    function filetextinelement(id, filePath, fc, postFc) {
        var t = document.getElementById(id);
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fileError');
                }
                return response.text();
            })
            .then(text => {
                fc(t, text);
            })
            .then(() => {
                postFc();
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    function filetextinelements(ids, filePaths, fc, postFc) {
        if (ids.length !== filePaths.length) {
            throw new Error('ids and filePaths must have the same number of elements');
        }
    
        const fetchPromises = filePaths.map(filePath => fetch(filePath).then(response => {
            if (!response.ok) {
                throw new Error('fileError');
            }
            return response.text();
        }));
    
        Promise.all(fetchPromises)
            .then(textArray => {
                ids.forEach((id, index) => {
                    const t = document.getElementById(id);
                    const text = textArray[index];
                    fc(t, text);
                });
            })
            .then(() => {
                postFc();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function download(filename, fileurl) {
        var fileUrl = fileurl;
    
        fetch(fileUrl)
            .then(response => response.text())
            .then(data => {
                var blob = new Blob([data], { type: 'text/plain' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('fail：', error));
    }
    
    function downloadwriter(content, filename) {
        var blob = new Blob([content], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}());