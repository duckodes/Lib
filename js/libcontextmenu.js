var option = document.getElementById("option");

option.addEventListener("click", () => {
    contextmenuutils.init(option.parentElement);
    contextmenuutils.addItem("Settings", () => { }, (c) => {
        c.addEventListener("click", () => {
            contextmenuutils.remove();
        });
        c.addEventListener("mouseenter", () => {
            c.style.background = "#202020";
        });
        c.addEventListener("mouseleave", () => {
            c.style.background = "";
        });
    });
    contextmenuutils.addItem("help", () => { }, (c) => {
        c.addEventListener("click", () => {
            contextmenuutils.remove();
        });
        c.addEventListener("mouseenter", () => {
            c.style.background = "#202020";
        });
        c.addEventListener("mouseleave", () => {
            c.style.background = "";
        });
    });
    contextmenuutils.addItem("", () => { }, (c) => {
        buttonutils.swb({
            a: storageutils.get('active'), bsw: "40px", csw: "14px", bsh: "20px", csh: "14px", bsbdr: "15px", csbdr: "15px", fs: 5,
            bsb: "#777", bsba: "#336", csb: "#333", csba: "#558", p: c, fc(active) {
                storageutils.set('active', active);
                if (active) {
                    themeutils.tokyonightdark();
                }
                else {
                    themeutils.vs2015();
                }
            }
        });
    });
});