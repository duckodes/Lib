function filetextinelement(id, filePath, fc) {
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