var convertutilstest = (function () {
    // NONE: Element count, SVG element Detect
    function DOMparser(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        let result = '';

        const handleElement = (element, parent) => {
            result += `const ${element.tagName.toLowerCase()} = document.createElement('${element.tagName}');\n`;

            if (parent) {
                result += `${parent.toLowerCase()}.appendChild(${element.tagName.toLowerCase()});\n`;
            }

            if (element.childNodes.length > 0) {
                for (const child of element.childNodes) {
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        handleElement(child, element.tagName);
                    } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                        if (element.tagName.toLowerCase() === 'style') {
                            // Handle multi-line text content within <style> tag
                            const textLines = child.textContent.trim().split('\n').map(line => `'${line.trim()}'`);
                            result += `${element.tagName.toLowerCase()}.textContent = ${textLines.join(' + \n')};\n`;
                        } else {
                            result += `${element.tagName.toLowerCase()}.textContent = '${child.textContent.trim()}';\n`;
                        }
                    }
                }
            }

            for (const attr of element.attributes) {
                result += `${element.tagName.toLowerCase()}.setAttribute("${attr.name}", "${attr.value}");\n`;
            }
        };

        const root = doc.body.firstChild;
        handleElement(root);

        return result;
    }
    // NONE: Element count
    function DOMparserWithSVG(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        let result = '';

        const handleElement = (element, parent) => {
            let createElement = `document.createElement('${element.tagName}')`;

            if (element.namespaceURI === 'http://www.w3.org/2000/svg') {
                // For SVG elements, use createElementNS
                createElement = `document.createElementNS('http://www.w3.org/2000/svg', '${element.tagName}')`;
            }

            result += `const ${element.tagName.toLowerCase()} = ${createElement};\n`;

            if (parent) {
                result += `${parent.toLowerCase()}.appendChild(${element.tagName.toLowerCase()});\n`;
            }

            if (element.childNodes.length > 0) {
                for (const child of element.childNodes) {
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        handleElement(child, element.tagName);
                    } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                        if (element.tagName.toLowerCase() === 'style') {
                            const textLines = child.textContent.trim().split('\n').map(line => `'${line.trim()}'`);
                            result += `${element.tagName.toLowerCase()}.textContent = ${textLines.join(' + \n')};\n`;
                        } else {
                            result += `${element.tagName.toLowerCase()}.textContent = '${child.textContent.trim()}';\n`;
                        }
                    }
                }
            }

            for (const attr of element.attributes) {
                result += `${element.tagName.toLowerCase()}.setAttribute("${attr.name}", "${attr.value}");\n`;
            }
        };

        const root = doc.body.firstChild;
        handleElement(root);

        return result;
    }
    function generateAppendChildInstructionsNotextContent(htmlContent) {
        const elementStack = [];

        const parseHTML = (html) => {
            let result = '';
            const pattern = /<([^>]+)>/g;
            let match;
            let count = 1;

            while ((match = pattern.exec(html)) !== null) {
                const tag = match[1];
                if (!tag.startsWith('/')) {
                    const element = tag.split(' ')[0];
                    const currentElement = `element${count}`;
                    result += `const ${currentElement} = document.createElement('${element}');\n`;
                    if (elementStack.length > 0) {
                        const parent = elementStack[elementStack.length - 1];
                        result += `${parent}.appendChild(${currentElement});\n`;
                    }
                    elementStack.push(currentElement);
                    count++;
                } else {
                    elementStack.pop();
                }
            }

            return result;
        };

        return parseHTML(htmlContent);
    }
    function generateAppendChildInstructions(htmlContent) {
        const elementStack = [];
        let result = '';

        const parseHTML = (html) => {
            const pattern = /<(\/?\w+)[^>]*>([^<]*)/g;
            let match;
            let count = 1;

            while ((match = pattern.exec(html)) !== null) {
                const [fullMatch, tag, textContent] = match;
                const isClosingTag = tag.startsWith('/');

                if (!isClosingTag) {
                    const currentElement = `element${count}`;
                    result += `const ${currentElement} = document.createElement('${tag}');\n`;

                    if (elementStack.length > 0) {
                        const parent = `element${elementStack[elementStack.length - 1]}`;
                        result += `${parent}.appendChild(${currentElement});\n`;
                    }

                    elementStack.push(count);
                    count++;
                } else {
                    elementStack.pop();
                }

                if (textContent.trim() !== '') {
                    const currentElement = `element${elementStack[elementStack.length - 1]}`;
                    result += `${currentElement}.textContent = '${textContent.trim()}';\n`;
                }
            }
        };

        parseHTML(htmlContent);

        return result;
    }
    function generateAppendChildInstructionsAttr(htmlContent) {
        const elementStack = [];
        let result = '';

        const parseHTML = (html) => {
            const pattern = /<(\/?\w+)[^>]*>([^<]*)/g;
            let match;
            let count = 1;

            while ((match = pattern.exec(html)) !== null) {
                const [fullMatch, tag, textContent] = match;
                const isClosingTag = tag.startsWith('/');

                if (!isClosingTag) {
                    const currentElement = `element${count}`;
                    result += `const ${currentElement} = document.createElement('${tag}');\n`;

                    if (elementStack.length > 0) {
                        const parent = `element${elementStack[elementStack.length - 1]}`;
                        result += `${parent}.appendChild(${currentElement});\n`;
                    }

                    elementStack.push(count);
                    count++;
                } else {
                    elementStack.pop();
                }

                if (textContent.trim() !== '') {
                    const currentElement = `element${elementStack[elementStack.length - 1]}`;
                    result += `${currentElement}.textContent = '${textContent.trim()}';\n`;
                }

                const attributes = fullMatch.match(/(\w+)=["'](.*?)["']/g);
                if (attributes && attributes.length > 0) {
                    const currentElement = `element${elementStack[elementStack.length - 1]}`;
                    attributes.forEach((attribute) => {
                        const [attrName, attrValue] = attribute.split('=');
                        result += `${currentElement}.setAttribute("${attrName}", ${attrValue});\n`;
                    });
                }
            }
        };

        parseHTML(htmlContent);

        return result;
    }
    function SVG_generateAppendChildInstructions(htmlContent) {
        const elementStack = [];
        let result = '';

        const parseHTML = (html) => {
            const pattern = /<(\/?\w+)[^>]*>([^<]*)/g;
            let match;
            let count = 1;
            let isSVG = false;

            while ((match = pattern.exec(html)) !== null) {
                const [fullMatch, tag, textContent] = match;
                const isClosingTag = tag.startsWith('/');
                const isSVGElement = tag.toLowerCase() === 'svg';

                if (!elementStack.length && isSVGElement) {
                    isSVG = true;
                }

                if (!isClosingTag) {
                    const currentElement = `element${count}`;
                    const createElementFunc = isSVG ? 'createElementNS' : 'createElement';
                    const createElementNSURI = isSVG ? "'http://www.w3.org/2000/svg'" : '';

                    result += `const ${currentElement} = document.${createElementFunc}(${createElementNSURI}, '${tag}');\n`;

                    if (elementStack.length > 0) {
                        const parent = `element${elementStack[elementStack.length - 1]}`;
                        result += `${parent}.appendChild(${currentElement});\n`;
                    }

                    elementStack.push(count);
                    count++;
                } else {
                    elementStack.pop();
                }

                if (textContent.trim() !== '') {
                    const currentElement = `element${elementStack[elementStack.length - 1]}`;
                    result += `${currentElement}.textContent = '${textContent.trim()}';\n`;
                }

                if (isSVG) {
                    const currentElement = `element${elementStack[elementStack.length - 1]}`;
                    const attributes = fullMatch.match(/(\w+)=["'](.*?)["']/g);
                    if (attributes && attributes.length > 0) {
                        attributes.forEach((attribute) => {
                            const [attrName, attrValue] = attribute.split('=');
                            if (attrName !== "xmlns") {
                                result += `${currentElement}.setAttribute("${attrName}", ${attrValue});\n`;
                            }
                        });
                    }
                }
            }
        };

        parseHTML(htmlContent);

        return result;
    }
    function extractElement(str) {
        const pattern = /<([^>]*)>/g;
        const matches = [];
        let match;

        while ((match = pattern.exec(str)) !== null) {
            matches.push(match[1]);
        }

        return matches;
    }
    function extractElementWithoutSlash(str) {
        const pattern = /<([^>/][^>]*)>/g;
        const matches = [];
        let match;

        while ((match = pattern.exec(str)) !== null) {
            if (!match[1].trim().endsWith('/')) {
                matches.push(match[1]);
            }
        }

        return matches;
    }
    function extractContent(str) {
        const pattern = />(.*?)</g;
        const matches = [];
        let match;

        while ((match = pattern.exec(str)) !== null) {
            matches.push(match[1]);
        }

        return matches;
    }
    function getLetterByIndex(n) {
        // a~z => then null
        if (n < 0 || n > 25) {
            return null;
        } else {
            return String.fromCharCode(97 + n);
        }
    }
    function getAlphabetByIndex(n) {
        // a~z => aa~zz => aaa~zzz ...
        let result = '';
        const base = 26;
        const letters = 'abcdefghijklmnopqrstuvwxyz';

        while (n >= 0) {
            result = letters[n % base] + result;
            n = Math.floor(n / base) - 1;
        }

        return result;
    }
}());