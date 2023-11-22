var fileutils = (function (){
    return{
        ReadFileText: ReadFileText,
        ReadFilesText: ReadFilesText,
        filetextinelement: filetextinelement,
        filetextinelements: filetextinelements
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
}());
