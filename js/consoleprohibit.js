var consoleprohibit = (function () {
    return {
        init: init
    };
    function init() {
        const emptyFunction = () => { };

        for (const method in console) {
            if (typeof console[method] === 'function') {
                console[method] = emptyFunction;
                Object.defineProperty(console, method, {
                    get: function () {
                        return emptyFunction;
                    },
                    set: function () {
                        checkConsoleLog();
                    }
                });
            }
        }

        function checkConsoleLog() {
            for (const method in console) {
                if (typeof console[method] === 'function') {
                    if (console[method] !== emptyFunction) {
                        console[method] = emptyFunction;
                    }
                }
            }
        }
        Object.defineProperty(window, 'console', {
            value: window.console,
            writable: false,
            configurable: false
        });
        Object.defineProperty(window, 'alert', {
            value: null,
            writable: false,
            configurable: false
        });
        Object.defineProperty(URL, 'createObjectURL', {
            value: null,
            writable: false,
            configurable: false
        });
        Object.defineProperty(window, 'Blob', {
            value: null,
            writable: false,
            configurable: false
        });
    }
}());