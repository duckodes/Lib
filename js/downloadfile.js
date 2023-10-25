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
function downloadFileTO(filename, fileurl) {
    // 指定服务器上的文件路径
    var fileUrl = fileurl; // 替換成實際文件的 URL
  
    // 使用 Fetch API 下載文件
    fetch(fileUrl)
      .then(response => response.blob()) // 使用 blob() 方法获取文件的 Blob 数据
      .then(blob => {
        // 创建一个下载链接
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename; // 指定下载的文件名
  
        // 模拟用户单击下载链接以触发保存对话框
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
  
        // 清理创建的链接和 URL 对象
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
      })
      .catch(error => console.error('下载失敗：', error));
  }


function downloadtxtwriteFile() {
    var content = '这是文件的内容';
    var blob = new Blob([content], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'file.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}
function downloadCSharpwriteFile() {
    var csharpCode = 'using System;\n\npublic class HelloWorld {\n    public static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}';
    var blob = new Blob([csharpCode], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'HelloWorld.cs'; // 设置文件名为 HelloWorld.cs
    a.click();
    window.URL.revokeObjectURL(url);
}