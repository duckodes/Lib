function consoleoutput(id, message) {
    var consoleOutput = document.getElementById(id);
    consoleOutput.innerHTML += message + '<br>';
}
console.log = function (message) {
    logToHtml(message);
};