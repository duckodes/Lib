function downloadFile(filename, fileurl) {
    // 指定服务器上的文件路径
    var fileUrl = fileurl; // 替換成實際文件的 URL

    // 使用 Fetch API 下載文件
    fetch(fileUrl)
        .then(response => response.text()) // 如果文件是文本，使用 text() 方法
        .then(data => {
            var blob = new Blob([data], { type: 'text/plain' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename; // 指定下載的文件名
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('下載失敗：', error));
}

function downloadwritefile(content, filename) {
    var blob = new Blob([content], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}