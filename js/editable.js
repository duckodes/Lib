/**
 * [Reference]
 * 
 * [UGPrivateLibrary.html](../UGPrivateLibrary.html)
 * 
 * @version 1.1.3
 */
var editable = (function () {
    return {
        editablecontent: editablecontent
    };
    function editablecontent(id) {
        const editor = document.getElementById(id);
        editor.setAttribute("contenteditable", "true");
        editor.addEventListener('focus', () => {
            editor.innerHTML = editor.innerText;
        });
        editor.addEventListener('blur', () => {
            editor.innerHTML = hljs.highlightAuto(editor.innerText).value;
        });
        editor.addEventListener("input", () => {
            editor.scrollTop = editor.scrollHeight;
            console.log(getCharacterBeforeCursor(editor));
            console.log(getCharacterAfterCursor(editor));
        });
        editor.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(editor);
                preCaretRange.setEnd(range.endContainer, range.endOffset);

                const text = preCaretRange.toString();
                const lines = text.split('\n');

                const cursorPosition = range.startOffset;

                // 找到當前行有 { 或 } 符號的行
                let currentLine = null;
                for (let i = cursorPosition; i >= 0; i--) {
                    if (lines[i] && (lines[i].includes('{') || lines[i].includes('}'))) {
                        currentLine = i;
                        break;
                    }
                }
                if (currentLine !== null) {
                    if (ckcfront(editor) === '{') {
                        if (getCharacterBeforeCursor() === '{' && getCharacterAfterCursor(editor) === '}') {
                            const leadingSpaces = lines[currentLine].match(/^\s*/)[0] || ''; // 匹配開頭空格

                            // Insert the indentation at the beginning of the new line
                            document.execCommand('insertText', false, '\n' + leadingSpaces + '    ' + '\n' + leadingSpaces);

                            moveCursorToPreviousLine();
                            moveCursorToLineEnd();
                            /*setTimeout(() => {
                                //insertTextAfterCursor('\n' + leadingSpaces);
                            }, 1);*/
                            // 防止 Enter 鍵的默認行為
                            event.preventDefault();
                        }
                        else {
                            const leadingSpaces = lines[currentLine].match(/^\s*/)[0] || ''; // 匹配開頭空格

                            // Insert the indentation at the beginning of the new line
                            document.execCommand('insertText', false, '\n' + leadingSpaces);

                            // 防止 Enter 鍵的默認行為
                            event.preventDefault();
                        }
                    } else {
                        const leadingSpaces = lines[currentLine].match(/^\s*/)[0] || ''; // 匹配開頭空格

                        // Insert the indentation at the beginning of the new line
                        document.execCommand('insertText', false, '\n' + leadingSpaces);

                        // 防止 Enter 鍵的默認行為
                        event.preventDefault();

                    }
                }
            } else if (event.key === 'Backspace') {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(editor);
                preCaretRange.setEnd(range.endContainer, range.endOffset);

                const text = preCaretRange.toString();
                const lines = text.split('\n');

                let cursorPosition = range.startOffset;

                let lineWithBrace = null;
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes('{') || lines[i].includes('}')) {
                        lineWithBrace = i;
                        break;
                    }
                }

                if (lineWithBrace !== null) {
                    const lineText = lines[lineWithBrace];
                    const braceIndex = lineText.indexOf('{') !== -1 ? lineText.indexOf('{') : lineText.indexOf('}');
                    const braceType = braceIndex !== -1 ? lineText.charAt(braceIndex) : null;

                    const leadingSpaces = lineText.substring(0, braceIndex).search(/\S|$/);

                    if (braceType === '{') {
                        let spacesToDelete = 0;
                        for (let i = cursorPosition - 1; i >= 0; i--) {
                            if (lineText.charAt(i) === ' ') {
                                spacesToDelete++;
                            } else {
                                break;
                            }
                        }
                        if (spacesToDelete > leadingSpaces + 1) {
                            event.preventDefault();
                            document.execCommand('delete', false, null);
                        }
                    } else if (braceType === '}') {
                        let spacesToDelete = 0;
                        for (let i = cursorPosition - 1; i >= 0; i--) {
                            if (lineText.charAt(i) === ' ') {
                                spacesToDelete++;
                            } else {
                                break;
                            }
                        }
                        if (spacesToDelete > leadingSpaces) {
                            event.preventDefault();
                            document.execCommand('delete', false, null);
                        }
                    }
                }

                checkLRSelect("{", "}");
                checkLRSelect("[", "]");
                checkLRSelect("(", ")");
                checkLRSelect('"', '"');
                checkLRSelect("'", "'");
                function checkLRSelect(key, key2) {
                    if (getCharacterBeforeCursor(editor).trim() === key && getCharacterAfterCursor(editor).trim() === key2) {
                        selectWordAtCursorLR();
                    }
                }
            } else if (event.key === '{') {
                checkdoublekey("{", "}");
                wantcheckkeytoadddouble("[", "]", '{', '}');
                wantcheckkeytoadddouble("(", ")", '{', '}');
                wantcheckkeytoadddouble('"', '"', '{', '}');
                wantcheckkeytoadddouble("'", "'", '{', '}');
            } else if (event.key === '}') {
                checkskip("{", "}");
            }
            else if (event.key === '[') {
                checkdoublekey('[', ']');
                wantcheckkeytoadddouble('{', '}', '[', ']');
                wantcheckkeytoadddouble("(", ")", '[', ']');
                wantcheckkeytoadddouble('"', '"', '[', ']');
                wantcheckkeytoadddouble("'", "'", '[', ']');
            }
            else if (event.key === ']') {
                checkskip('[', ']');
            }
            else if (event.key === '(') {
                checkdoublekey('(', ')');
                wantcheckkeytoadddouble('{', '}', '(', ')');
                wantcheckkeytoadddouble("[", "]", '(', ')');
                wantcheckkeytoadddouble('"', '"', '(', ')');
                wantcheckkeytoadddouble("'", "'", '(', ')');
            }
            else if (event.key === ')') {
                checkskip('(', ')');
            }
            else if (event.key === '"') {
                checkonlykey('"');
            }
            else if (event.key === "'") {
                checkonlykey("'");
            }
            function checkonlykey(key) {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const selectionText = window.getSelection().toString();
                if (getCharacterAfterCursor(editor).trim() === '' && getCharacterAfterCursor(editor).trim() !== key) {
                    event.preventDefault();
                    document.execCommand('insertText', false, key + selectionText + key);
                    range.setStart(range.endContainer, range.endOffset + 1);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else if (getCharacterBeforeCursor(editor).trim() === key && getCharacterAfterCursor(editor).trim() === key2) {
                    event.preventDefault();
                    moveCursorForward(1);
                }
            }
            function checkdoublekey(key, key2) {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const selectionText = window.getSelection().toString();
                if (getCharacterAfterCursor(editor).trim() === '' && getCharacterAfterCursor(editor).trim() !== key) {
                    event.preventDefault();
                    document.execCommand('insertText', false, key + selectionText + key2);
                    range.setStart(range.endContainer, range.endOffset + 1);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else if (getCharacterBeforeCursor(editor).trim() === key && getCharacterAfterCursor(editor).trim() === key2) {
                    event.preventDefault();
                    document.execCommand('insertText', false, key + selectionText + key2);
                    range.setStart(range.endContainer, range.endOffset + 1);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
            function checkskip(key, key2) {
                if (getCharacterBeforeCursor(editor).trim() === key && getCharacterAfterCursor(editor).trim() === key2) {
                    event.preventDefault();
                    moveCursorForward(1);
                }
            }
            function wantcheckkeytoadddouble(key, key2, wantkey, wantkey2) {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const selectionText = window.getSelection().toString();
                if (getCharacterBeforeCursor(editor).trim() === key && getCharacterAfterCursor(editor).trim() === key2) {
                    event.preventDefault();
                    document.execCommand('insertText', false, wantkey + selectionText + wantkey2);
                    range.setStart(range.endContainer, range.endOffset + 1);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                disTabsBeforeSelection();
            } else if (e.key === "Tab") {
                e.preventDefault();
                //document.execCommand("insertText", false, "    ");
                insertTabsBeforeSelection();
            }
        });
    }
    function ckcfront(node) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(node);
        preCaretRange.setEnd(range.endContainer, range.endOffset);

        const text = preCaretRange.toString();
        const cursorPosition = text.lastIndexOf('{');
        const lastCloseBracePosition = text.lastIndexOf('}');

        let lastBrace = null;

        if (cursorPosition > lastCloseBracePosition) {
            lastBrace = '{';
            return lastBrace;
        } else if (lastCloseBracePosition > cursorPosition) {
            lastBrace = '}';
            return lastBrace;
        }
    }
    function getCharacterBeforeCursor() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        if (range.startOffset > 0) {
            const textNode = range.startContainer;
            const text = textNode.textContent.slice(0, range.startOffset);
            const characterBeforeCursor = text.charAt(text.length - 1);
            return characterBeforeCursor;
        } else {
            // Handle situation where cursor is at the beginning
            return ''; // or handle as per your requirement
        }
    }
    function getCharacterAfterCursor(node) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        if (range.endOffset < node.textContent.length) {
            const textNode = range.endContainer;
            const text = textNode.textContent.slice(range.endOffset, range.endOffset + 1);
            return text;
        } else {
            // Handle situation where cursor is at the end
            return ''; // or handle as per your requirement
        }
    }
    function insertTextAfterCursor(textToInsert) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const node = range.endContainer;
        const offset = range.endOffset;

        if (node.nodeType === Node.TEXT_NODE) {
            node.splitText(offset);
            const newNode = document.createTextNode(textToInsert);
            node.parentNode.insertBefore(newNode, node.nextSibling);
        } else {
            const newNode = document.createTextNode(textToInsert);
            node.insertBefore(newNode, node.childNodes[offset]);
        }
    }
    function insertTabsBeforeSelection() {
        if (window.getSelection) {
            let selection = window.getSelection();
            if (selection.rangeCount > 0) {
                let selectedText = selection.toString();
                let selectedRange = selection.getRangeAt(0);
                let selectedTextLines = selectedText.split('\n'); // 按换行符分割文本

                // 修改每一行的文本，在每行前插入 tab
                let modifiedText = selectedTextLines.map(line => `    ${line}`).join('\n');

                // 替换选定范围内的文本为修改后的文本
                selectedRange.deleteContents();
                selectedRange.insertNode(document.createTextNode(modifiedText));
                if (selectedText.trim().length <= 0) {
                    removeSelection();
                }
            }
        }
    }
    function disTabsBeforeSelection() {
        if (window.getSelection) {
            let selection = window.getSelection();
            if (selection.rangeCount > 0) {
                let selectedText = selection.toString();
                let selectedRange = selection.getRangeAt(0);
                let selectedTextLines = selectedText.split('\n'); // 按换行符分割文本

                // 修改每一行的文本，在每行前刪除四格
                let modifiedText = selectedTextLines.map(line => `${line.replace(/^ {4}/gm, '')}`).join('\n');

                // 替换选定范围内的文本为修改后的文本
                selectedRange.deleteContents();
                selectedRange.insertNode(document.createTextNode(modifiedText));

            }
        }
    }
    function removeSelection() {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let selectedRange = selection.getRangeAt(0);

            selectedRange.setStart(selectedRange.endContainer, selectedRange.endOffset);
            selectedRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(selectedRange);
        }
    }
    function moveCursorToPreviousLine() {
        let selection = window.getSelection();
        let focusNode = selection.focusNode;
        let focusOffset = selection.focusOffset;

        if (focusNode && focusNode.nodeType === Node.TEXT_NODE) {
            let range = document.createRange();
            range.setStart(focusNode, Math.max(0, focusOffset - 1));
            range.setEnd(focusNode, Math.max(0, focusOffset - 1));

            let rect = range.getBoundingClientRect();
            let newRange = document.caretRangeFromPoint(rect.left, rect.top - 20); // 移動到上一行

            if (newRange) {
                selection.removeAllRanges();
                selection.addRange(newRange);
            }
        }
    }
    function moveCursorToLineEnd() {
        let selection = window.getSelection();
        let focusNode = selection.focusNode;

        if (focusNode && focusNode.nodeType === Node.TEXT_NODE) {
            let range = document.createRange();
            range.selectNodeContents(focusNode);
            range.collapse(false); // 将范围折叠到当前节点的末尾

            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    function moveCursorForward(count) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const currentNode = range.endContainer;
            const offset = range.endOffset + count;

            if (currentNode.nodeType === Node.TEXT_NODE) {
                if (offset <= currentNode.length) {
                    range.setEnd(currentNode, offset);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    // 如果超出範圍，可以根據需要進行處理
                    console.log('超出範圍');
                }
            }
        }
    }
    function moveCursorBackward(count) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const currentNode = range.endContainer;
            const offset = range.endOffset - count;

            if (currentNode.nodeType === Node.TEXT_NODE) {
                if (offset >= 0) {
                    range.setEnd(currentNode, offset);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    // 如果超出範圍，可以根據需要進行處理
                    console.log('超出範圍');
                }
            }
        }
    }
    function selectWordAtCursorLR() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const currentNode = range.endContainer;
            const offset = range.endOffset;

            if (currentNode.nodeType === Node.TEXT_NODE) {
                const text = currentNode.textContent;

                if (offset > 0 && offset < text.length) {
                    // 選取游標左右各一個字母
                    range.setStart(currentNode, offset - 1);
                    range.setEnd(currentNode, offset + 1);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }
    }
}());