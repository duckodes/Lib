function scriptincode(id, filePath, fc) {
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

function scriptsincode(ids, filePaths, fc) {
    if (ids.length !== filePaths.length) {
        console.error("The length of 'ids' and 'filePaths' arrays must be the same.");
        return;
    }

    for (let i = 0; i < ids.length; i++) {
        var id = ids[i];
        var filePath = filePaths[i];
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
}