var convertutils = (function () {
    return {
        DOMparserAll: DOMparserAll
    };
    function DOMparserAll(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        let result = '';
        let elementCounter = 1; // Counter for appending numbers to element names

        const handleElement = (element, parent) => {
            let createElement = `document.createElement('${element.tagName}')`;

            if (element.namespaceURI === 'http://www.w3.org/2000/svg') {
                // For SVG elements, use createElementNS
                createElement = `document.createElementNS('http://www.w3.org/2000/svg', '${element.tagName}')`;
            }

            const elementName = `${element.tagName.toLowerCase()}${elementCounter}`;
            result += `const ${elementName} = ${createElement};\n`;
            elementCounter++;

            if (parent) {
                result += `${parent.toLowerCase()}.appendChild(${elementName});\n`;
            }

            if (element.childNodes.length > 0) {
                for (const child of element.childNodes) {
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        handleElement(child, elementName);
                    } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                        if (element.tagName.toLowerCase() === 'style') {
                            const textLines = child.textContent.trim().split('\n').map(line => `'${line.trim()}'`);
                            result += `${elementName}.textContent = ${textLines.join(' + \n')};\n`;
                        } else {
                            result += `${elementName}.textContent = '${child.textContent.trim()}';\n`;
                        }
                    }
                }
            }

            for (const attr of element.attributes) {
                result += `${elementName}.setAttribute("${attr.name}", "${attr.value}");\n`;
            }
        };

        const root = doc.body.firstChild;
        handleElement(root);

        return result;
    }
}());