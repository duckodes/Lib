function consoleoutput() {
    var consoleOutput = document.createElement("div");
    document.body.appendChild(consoleOutput);
    console.log = function (message) {
        consoleOutput.innerHTML += "<span style='color: white;'>[Log] " + message + "</span><br>";
    };
    console.error = function (message) {
        consoleOutput.innerHTML += "<span style='color: red;'>[Error] " + message + "</span><br>";
    };

    console.warn = function (message) {
        consoleOutput.innerHTML += "<span style='color: orange;'>[Warning] " + message + "</span><br>";
    };

    console.info = function (message) {
        consoleOutput.innerHTML += "<span style='color: blue;'>[Info] " + message + "</span><br>";
    };
    window.onerror = function (message, source, lineno, colno, error) {
        console.error('錯誤訊息：'+ message);
        console.error('來源：' + source);
        console.error('行號：' + lineno);
        console.error('列號：' + colno);
        console.error('錯誤對象：' + error);
        return true;
    };
    
}