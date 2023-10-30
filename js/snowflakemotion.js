var symbols = ["❆", "❅", "❀"]; // 符號陣列，可以自行擴充

function createSnowflake() {
    var snowflake = document.createElement("span");
    var randomIndex = Math.floor(Math.random() * symbols.length); // 隨機選取符號索引
    var selectedSymbol = symbols[randomIndex]; // 從符號陣列中取得隨機符號

    snowflake.innerHTML = selectedSymbol;
    snowflake.className = "snowflake";
    snowflake.style.left = Math.random() * (window.innerWidth - 75) + "px";
    snowflake.style.animationDuration = Math.random() * 3 + 10 + "s";
    snowflake.style.fontSize = Math.random() * 20 + 20 + "px";
    snowflake.style.transform = "rotate(" + Math.random() * 360 + "deg)";

    document.body.appendChild(snowflake);

    setTimeout(function () {
        snowflake.style.opacity = "0";
        setTimeout(function () {
            snowflake.remove();
        }, 1000);
    }, 10000);
}

setInterval(function () {
    createSnowflake();
}, 1500);