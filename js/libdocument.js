var libdocument = (function () {
    return {
        init: init
    };
    function init() {
        if (paramname.getParameterByName("v", window.location.href)) {
            if (paramname.getParameterByName("v", window.location.href).includes("AudioCollection")) {
                AudioCollection(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("Counter")) {
                Counter(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("DraggablePanel")) {
                DraggablePanel(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("InitializationEvent")) {
                InitializationEvent(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("MenuGeneric")) {
                MenuGeneric(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("Searcher")) {
                Searcher(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("Timer")) {
                Timer(true);
            }
            else if (paramname.getParameterByName("v", window.location.href).includes("UI-Sizer")) {
                UISizer(true);
            }
            libsourceselect(generateAlphabetSequence(paramname.getParameterByName("v", window.location.href)));
        }
        else {
            window.location.href = "UGPrivateLibrary.html";
        }
        function libsourceselect(n) {
            var elmt = document.querySelector('.lib-sources.no-select').children[n];
            elmt.classList += " select-lib";
        }
        function generateAlphabetSequence(str) {
            const firstChar = str.toLowerCase().charAt(0);

            if (firstChar >= 'a' && firstChar <= 'z') {
                const alphabet = 'abcdefghijklmnopqrstuvwxyz';
                const startIndex = alphabet.indexOf(firstChar);
                return startIndex;
            } else {
                return "請輸入以英文字母開頭的字串。";
            }
        }
    }
    function Counter(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>Counter 計數工具</h2>' +
            '<h6>' +
            '<br><br>作用: 可產生計數 GUI' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Settings: 選項有UI、Normal，UI可調整GUI介面， Normal可調整變數等功能' +
            '<br><br>Display: 該選項是控制數字的顯示方式，可顯示SI制或是只有秒，帶有Decimal 2為十進制，會顯示兩位數，如: 01、02' +
            '<br><br>Option: KeyCode是由按鍵控制計數方式，DeltaTime是由時間控制' +
            '<br><br>Calculation: 可選擇該數字是要增加還是減少' +
            '<br><br>Default Count: 默認計數' +
            '<br><br>Fluctuation: 計數要增加或減少的值' +
            '<br><br>Per: 頻率，若為"1"該計數以每"1"秒運算一次，以此類推' +
            '<br><br>Min Max: 設定計數最小值與最大值' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-Counter-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-Counter-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">Counter.cs  </div></pre>';
        document.body.innerHTML += src;
        redis();
        setTimeout(() => {
            fileutils.filetextinelement('code-text-Counter-cs', 'Resource/OriginFile/csharpFile/UI/Counter/Counter.cs', (t, text) => {
                t.textContent = text;
            }, () => {
                if (ck) {
                    copycode("code-copy-Counter-cs", "code-text-Counter-cs");
                    var downloadFiler = document.querySelectorAll('.download-file');
                    downloadFiler.forEach(function (e) {
                        e.addEventListener("click", () => {
                            if (e.innerText === "Counter.cs  ") {
                                fileutils.download('Counter.cs', 'Resource/OriginFile/csharpFile/UI/Counter/Counter.cs');
                            }
                        });
                    });
                    hljs.highlightAll();
                }
            });
        }, 100);
    }
    function AudioCollection(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>AudioCollection 音頻驅動器</h2>' +
            '<h6>' +
            '<br><br>作用: 可設置需要的音频源(AudioSource)，及對應的音頻數據資料源(AudioClip)' +
            '<br><span class="mark-pinkred">(若使用AudioCollection.cs內方法，如:使用Play()方法，AudioSource就會在方法裡面對應AudioClip)</span>' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Audio Collector: 該List包含兩個置入，為AudioSource、AudioClip' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-AudioCollection-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-AudioCollection-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">AudioCollection.cs  </div></pre>';
        document.body.innerHTML += src;
        redis();
        setTimeout(() => {
            fileutils.filetextinelement('code-text-AudioCollection-cs', 'Resource/OriginFile/csharpFile/Audio/AudioCollection.cs', (t, text) => {
                t.textContent = text;
            }, () => {
                if (ck) {
                    copycode("code-copy-AudioCollection-cs", "code-text-AudioCollection-cs");
                    var downloadFiler = document.querySelectorAll('.download-file');
                    downloadFiler.forEach(function (e) {
                        e.addEventListener("click", () => {
                            if (e.innerText === "AudioCollection.cs  ") {
                                fileutils.download('AudioCollection.cs', 'Resource/OriginFile/csharpFile/Audio/AudioCollection.cs');
                            }
                        });
                    });
                    hljs.highlightAll();
                }
            });
        }, 100);
    }
    function DraggablePanel(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>DraggablePanel 浮動窗口</h2>' +
            '<h6>' +
            '<br><br>作用: 可產生GUI.Window生成的浮動窗口' +

            '<br><br><br>使用: ' +
            '<br>1.置入unity空物件' +
            '<br>2.拖動標題欄位即可移動' +
            '<br>3.視窗右下角的位置按下滑鼠左鍵可調整視窗大小' +
            '<br>4.視窗右上角放大及關閉按鈕' +
            '<span class="mark-place">' +
            '<br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Rect: 調整初始位置及大小' +
            '<br><br>Title Size: 標題的大小' +
            '<br><br>Text Anchor: 標題文字位置' +
            '<br><br>Min Size: 此拖動視窗可縮放的最小大小' +
            '<br><br>Resize Cursor: 當滑鼠移動進入右下角可縮放區域時，顯示的滑鼠樣式' +
            '</span>' +
            '</h6>' +
            '<div  style="white-space: nowrap;">' +
            '<br><br><img src="image/lib/lib-code-DraggablePanel.png" id="lib-draggablepanel">' +
            '</div>' +
            '<br><br><br></div><div id="code-copy-DraggablePanel-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-DraggablePanel-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">DraggablePanel.cs  </div></pre>';
        document.body.innerHTML += src;
        redis();
        setTimeout(() => {
            fileutils.filetextinelement('code-text-DraggablePanel-cs', 'Resource/OriginFile/csharpFile/UI/DraggablePanel/DraggablePanel.cs', (t, text) => {
                t.textContent = text;
            }, () => {
                if (ck) {
                    copycode("code-copy-DraggablePanel-cs", "code-text-DraggablePanel-cs");
                    var libdraggablepanel = document.getElementById("lib-draggablepanel");
                    libdraggablepanel.addEventListener("mousedown", () => {
                        showImg("image/lib/lib-code-DraggablePanel.png", "", "", true, "&times;", "rgba(0, 0, 0, 0)", top = "10px", null, null, "10px", false);
                    });
                    var downloadFiler = document.querySelectorAll('.download-file');
                    downloadFiler.forEach(function (e) {
                        e.addEventListener("click", () => {
                            if (e.innerText === "DraggablePanel.cs  ") {
                                fileutils.download('DraggablePanel.cs', 'Resource/OriginFile/csharpFile/UI/DraggablePanel/DraggablePanel.cs');
                            }
                        });
                    });
                    hljs.highlightAll();
                }
            });
        }, 100);
    }
    function InitializationEvent(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>InitializationEvent 生命週期初始化事件</h2>' +
            '<h6>' +
            '<br><br>作用: 可新增需要的Initialization對象作用的Event' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Add Initialization Event: 可開啟需要初始化對象的事件' +
            '<br>再次點擊關閉並不會移除之前新增的對象，必須要移除該Event內的對象，才會移除' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-InitializationEvent-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-InitializationEvent-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">InitializationEvent.cs  </div></pre>';
        document.body.innerHTML += src;
        redis();
        setTimeout(() => {
            fileutils.filetextinelement('code-text-InitializationEvent-cs', 'Resource/OriginFile/csharpFile/Event/InitializationEvent.cs', (t, text) => {
                t.textContent = text;
            }, () => {
                if (ck) {
                    copycode("code-copy-InitializationEvent-cs", "code-text-InitializationEvent-cs");
                    var downloadFiler = document.querySelectorAll('.download-file');
                    downloadFiler.forEach(function (e) {
                        e.addEventListener("click", () => {
                            if (e.innerText === "InitializationEvent.cs  ") {
                                fileutils.download('InitializationEvent.cs', 'Resource/OriginFile/csharpFile/Event/InitializationEvent.cs');
                            }
                        });
                    });
                    hljs.highlightAll();
                }
            });
        }, 100);
    }
    function MenuGeneric(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>MenuGeneric 菜單工具</h2>' +
            '<h6>' +
            '<br><br>作用: 運用UnityEditor.GenericMenu類，寫出簡易方法供使用，使用Start、Add、End方法即可完成菜單功能' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Parameter ===&gt;&gt;' +
            '<br><br>position: 生成菜單位置' +
            '<br><br>menu: 這是一個out參數，將menu給予EndMenu即可' +
            '<br>當然在StartMenu與EndMenu之間也可以更改menu的設置' +
            '<br><br>menuPosition: 這也是一個out參數，將menuPosition給予EndMenu即可' +
            '<br><br>itemName: 菜單選項的名稱' +
            '<br><br>check: 菜單選項是否要具有打勾' +
            '<br><br>menuFunction: 菜單按下去運用方法' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-MenuGeneric-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-MenuGeneric-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">MenuGeneric.cs  </div></pre>' +
            '<pre class="re-link" style="border-radius: 10px;"><code>示範寫法 1.' +
            '\n&ensp;&ensp;&ensp;&ensp;StartMenu(new Vector2(0, 0), out GenericMenu menu, out Vector2 menuPosition);' +
            '\n&ensp;&ensp;&ensp;&ensp;AddMenu(menu, "Test1", false, () => { //TODO:點擊菜單作用域 });' +
            '\n&ensp;&ensp;&ensp;&ensp;EndMenu(menu, menuPosition);' +

            '\n\n示範寫法 2.' +
            '\n&ensp;&ensp;&ensp;&ensp;StartMenu(out GenericMenu menu);' +
            '\n&ensp;&ensp;&ensp;&ensp;AddMenu(menu, "Test2", false, () => { //TODO:點擊菜單作用域 });' +
            '\n&ensp;&ensp;&ensp;&ensp;EndMenu(menu);' +

            '\n\n(當然這需要被放入事件當中，如: if(UnityEngine.GUILayout.Button("Test Menu"))，或是滑鼠鍵盤等事件)</code></pre>';
        document.body.innerHTML += src;
        redis();
        setTimeout(() => {
            fileutils.filetextinelement('code-text-MenuGeneric-cs', 'Resource/OriginFile/csharpFile/UI/MenuGeneric/MenuGeneric.cs', (t, text) => {
                t.textContent = text;
            }, () => {
                if (ck) {
                    copycode("code-copy-MenuGeneric-cs", "code-text-MenuGeneric-cs");
                    var downloadFiler = document.querySelectorAll('.download-file');
                    downloadFiler.forEach(function (e) {
                        e.addEventListener("click", () => {
                            if (e.innerText === "MenuGeneric.cs  ") {
                                fileutils.download('MenuGeneric.cs', 'Resource/OriginFile/csharpFile/UI/MenuGeneric/MenuGeneric.cs');
                            }
                        });
                    });
                    hljs.highlightAll();
                }
            });
        }, 100);
    }
    function Searcher(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>Searcher搜尋</h2>' +
            '<h6>' +
            '<br><br>作用: 提供簡易搜尋功能方法' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Variable ===&gt;&gt;' +
            '<br><br>m_keyword -- 搜尋的文字' +
            '<br><br>source -- 搜尋資料來源陣列' +
            '<br><br>action -- 作用方法' +
            '<br><br>stringComparison -- 字符串比較，如: 忽略大小寫' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-Searcher-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-Searcher-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">Searcher.cs  </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>示範應用Searcher.cs</h2>' +
            '<h6>' +
            '<br><br>作用: 提供簡易搜尋功能方法' +

            '<br><br><br>以 Unity GUI System 作為範例' +
            '</h6>' +
            '<br><br><br></div><div id="code-copy-CustomSearch-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-CustomSearch-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">CustomSearch.cs  </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>Search</h2>' +
            '<h6>' +
            '<br><br>作用: 可產生搜尋GUI面板' +

            '<br><br><br>使用: ' +
            '<br>1.此類需要結合Searcher.cs，應用以上方法' +
            '<br>2.置入unity空物件' +
            '<br>3.Source填入資料來源' +
            '<span class="mark-place">' +
            '<br><br><br>&lt;&lt;=== Unity Inspector Display Variable=== &gt;&gt;' +
            '<br><br>On Action(String) Event: 當搜尋列按下第n項button時，傳入第n項的字符串' +
            '<br><br>Inspector 操作項 X, Y: 以Screen Resulotion的相對位置，腳本內也有相對應的方法設置X, Y 值' +
            '<br><br>..Option: 可更改UI介面設置' +
            '</span>' +
            '</h6>' +
            '<div  style="white-space: nowrap;">' +
            '<br><br><img src="image/lib/lib-code-Search-ex.png" id="lib-search-ex">' +
            '<img src="image/lib/lib-code-inspectorSearch.png" id="lib-search-inspector">' +
            '</div>' +
            '<br><br><br></div><div id="code-copy-Search-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-Search-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">Search.cs  </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>Search Extension1.0.2</h2>' +
            '<h6>' +
            '<br><br>作用: Search增強版 版本:1.0.2' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity New Inspector Display Variable ===&gt;&gt;' +
            '<br><br>EmptyHide: 當輸入框無任何字符，開啟或關閉生成的來源按鈕' +
            '<br>*註記(例如: 搜尋框一開始隱藏所有來源、指令框會一開始出現所有指令等等..用法)' +
            '<br><br>Background Color, Background Texture2D: 調整背景顏色、背景貼圖' +
            '<br><br>Show Slider: 開啟或關閉滑條的顯示，如關閉Slider依然可以使用，僅不會看到外觀樣式' +
            '</span>' +
            '</h6>' +
            '<div  style="white-space: nowrap;">' +
            '</div>' +
            '<br><br><br><br><br></div><div id="code-copy-SearchEx1-0-2-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-SearchEx1-0-2-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">Search.cs(1.0.2)   </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>Search Extension1.0.3</h2>' +
            '<h6>' +
            '<br><br>作用: Search增強版 版本:1.0.3' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity New Inspector Display Variable ===&gt;&gt;' +
            '<br><br>UsePercentage(m_usePercentage): 此變數是用來轉換X(m_x)跟Y(m_y)的百分比' +
            '</span>' +
            '<span class="mark-pinkred">' +
            '<br><br><br><br>&lt;&lt;=== New Function ===&gt;&gt;' +
            '<br><br>GetSearchRect(): 用來提供Search面板的Rect，方便外部使用' +
            '<br><br>SetUsePercentage(bool use): 用來設置UsePercentage(m_usePercentage)的值' +
            '<br><br>SetShow(bool visible): 此為版本更新重點，該布爾值控制OnGUI是否要進行繪畫，其餘方法條件均會起作用，' +
            '<br>如果是以enabled來控制顯示，該腳本其餘方法條件均會停止作用。' +
            '<br><br>SetOnMouse(): 此為版本更新第二重點，此方法會直接將X(m_x)與Y(m_y)百分比設無，接著將Search的位置填充進Mouse的位置' +
            '</span>' +
            '</h6>' +
            '<div  style="white-space: nowrap;">' +
            '</div>' +
            '<br><br><br><br><br></div><div id="code-copy-SearchEx1-0-3-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-SearchEx1-0-3-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">Search.cs(1.0.3)   </div></pre>';
        document.body.innerHTML += src;
        redis(300);
        setTimeout(() => {
            fileutils.filetextinelements(['code-text-Searcher-cs',
                'code-text-CustomSearch-cs',
                'code-text-Search-cs',
                'code-text-SearchEx1-0-2-cs',
                'code-text-SearchEx1-0-3-cs'],
                ['Resource/OriginFile/csharpFile/UI/Searcher/Searcher.cs',
                    'Resource/OriginFile/csharpFile/UI/Searcher/CustomSearch.cs',
                    'Resource/OriginFile/csharpFile/UI/Searcher/Search.cs',
                    'Resource/OriginFile/csharpFile/UI/Searcher/SearchExtension/1.0.2/Search.cs',
                    'Resource/OriginFile/csharpFile/UI/Searcher/SearchExtension/1.0.3/Search.cs'], (t, text) => {
                        t.textContent = text;
                    }, () => {
                        if (ck) {
                            copycode("code-copy-Searcher-cs", "code-text-Searcher-cs");
                            copycode("code-copy-CustomSearch-cs", "code-text-CustomSearch-cs");
                            copycode("code-copy-Search-cs", "code-text-Search-cs");
                            copycode("code-copy-SearchEx1-0-2-cs", "code-text-SearchEx1-0-2-cs");
                            copycode("code-copy-SearchEx1-0-3-cs", "code-text-SearchEx1-0-3-cs");
                            var libsearchex = document.getElementById("lib-search-ex");
                            var libsearchinspector = document.getElementById("lib-search-inspector");
                            libsearchex.addEventListener("mousedown", () => {
                                showImg("image/lib/lib-code-Search-ex.png", "", "", true, "&times;", "rgba(0, 0, 0, 0)", top = "10px", null, null, "10px", false);
                            });
                            libsearchinspector.addEventListener("mousedown", () => {
                                showImg("image/lib/lib-code-inspectorSearch.png", "Unity Inspector", "", true, "&times;", "rgba(0, 0, 0, 0)", top = "10px", null, null, "10px", false);
                            });
                            var downloadFiler = document.querySelectorAll('.download-file');
                            downloadFiler.forEach(function (e) {
                                e.addEventListener("click", () => {
                                    if (e.innerText === "Searcher.cs  ") {
                                        fileutils.download('Searcher.cs', 'Resource/OriginFile/csharpFile/UI/Searcher/Searcher.cs');
                                    }
                                    if (e.innerText === "CustomSearch.cs  ") {
                                        fileutils.download('CustomSearch.cs', 'Resource/OriginFile/csharpFile/UI/Searcher/CustomSearch.cs');
                                    }
                                    if (e.innerText === "Search.cs  ") {
                                        fileutils.download('Search.cs', 'Resource/OriginFile/csharpFile/UI/Searcher/Search.cs');
                                    }
                                    if (e.innerText.includes('Search.cs(1.0.2)')) {
                                        fileutils.download('Search.cs', 'Resource/OriginFile/csharpFile/UI/Searcher/SearchExtension/1.0.2/Search.cs');
                                    }
                                    if (e.innerText.includes('Search.cs(1.0.3)')) {
                                        fileutils.download('Search.cs', 'Resource/OriginFile/csharpFile/UI/Searcher/SearchExtension/1.0.3/Search.cs');
                                    }
                                });
                            });
                            hljs.highlightAll();
                        }
                    });
        }, 100);
    }
    function Timer(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>Timer 時間軸(生命週期調整)</h2>' +
            '<h6>' +
            '<br><br>作用: 可讓 生命週期Update()，進行時間調整' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Parameter ===&gt;&gt;' +
            '<br><br>action: 在action裡面，會依照指定的時間進行變更' +
            '<br><br>per: 每幾秒更新一次update' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-Timer-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-Timer-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">Timer.cs  </div></pre>' +
            '<pre class="re-link" style="border-radius: 10px;"><code>示範寫法 1.' +
            '\n    public class Test : MonoBehaviour' +
            '\n    {' +
            '\n        private void Update()' +
            '\n        {' +
            '\n            Update(() => {' +
            '\n                //TODO: 每一秒更新一次' +
            '\n            }, 1);' +
            '\n        }' +
            '\n    }' +

            '\n\n示範寫法 2.' +
            '\n    public class Test : MonoBehaviour' +
            '\n    {' +
            '\n        private void Update()' +
            '\n        {' +
            '\n            Update((m_time) => {' +
            '\n                //TODO: 每一秒更新一次，並且傳入m_time值，可進行m_time操作' +
            '\n            }, 1);' +
            '\n        }' +
            '\n    }' +

            '\n\n進行初始化，Timer timer = new Timer()，會進行m_timer歸0</code></pre>';
        document.body.innerHTML += src;
        redis();
        setTimeout(() => {
            fileutils.filetextinelement('code-text-Timer-cs', 'Resource/OriginFile/csharpFile/Timer/Timer.cs', (t, text) => {
                t.textContent = text;
            }, () => {
                if (ck) {
                    copycode("code-copy-Timer-cs", "code-text-Timer-cs");
                    var downloadFiler = document.querySelectorAll('.download-file');
                    downloadFiler.forEach(function (e) {
                        e.addEventListener("click", () => {
                            if (e.innerText === "Timer.cs  ") {
                                fileutils.download('Timer.cs', 'Resource/OriginFile/csharpFile/Timer/Timer.cs');
                            }
                        });
                    });
                    hljs.highlightAll();
                }
            });
        }, 100);
    }
    function UISizer(ck) {
        var src = '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>UI-Sizer 介面縮放</h2>' +
            '<h6>' +
            '<br><br>作用: 使用 RectTransformSizer.cs 组件至 unity uGUI' +
            '<br>可快速使uGUI包含的RectTransform核心組件，進行簡易的用戶互動' +
            '<br><span class="mark-pinkred">(如要進行快速整體變形，應使用 RectTransformScaler.cs 組件。使用該組件，僅能讓當層RectTransform進行SizeDelta變更，因此如果變更需Text或TMP組件，需要使用LegacyTextSizer.cs或是TMPTextSizer.cs)</span>' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Rect Transform: 選擇要變更大小的核心組件' +
            '<br><br>Option: 更改欲變更大小的互動方式' +
            '<br><br>Mutiply Size: 相乘大小，該向量x與y是以原大小RectTransform組件內sizeDelta的x與y分別作乘積' +
            '<br><br>Animation Speed: 動畫速度' +
            '<br><br>Enter Speed: 互動\'開始\'的動畫曲線' +
            '<br><br>Leave Speed: 互動\'結束\'的動畫曲線' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-RectTransformSizer-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-RectTransformSizer-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">RectTransformSizer.cs  </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>RectTransformScaler</h2>' +
            '<h6>' +
            '<br><br>作用: 使用 RectTransformScaler.cs 组件至 unity uGUI' +
            '<br>可快速使uGUI包含的RectTransform核心組件，進行簡易的用戶互動' +
            '<br><span class="mark-pinkred">(該組件是以 RectTransform 的 Scale 進行變更，因此父關係層能夠完整的控制子層的縮放。)</span>' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Rect Transform: 選擇要變更大小的核心組件' +
            '<br><br>Option: 更改欲變更大小的互動方式' +
            '<br><br>Mutiply Size: 相乘大小，該向量x與y是以原大小RectTransform組件內 Local Scale 的x與y分別作乘積' +
            '<br><br>Animation Speed: 動畫速度' +
            '<br><br>Enter Speed: 互動\'開始\'的動畫曲線' +
            '<br><br>Leave Speed: 互動\'結束\'的動畫曲線' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-RectTransformScaler-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-RectTransformScaler-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">RectTransformScaler.cs  </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>LegacyTextSizer</h2>' +
            '<h6>' +
            '<br><br>作用: 使用 LegacyTextSizer.cs 组件至 unity uGUI' +
            '<br>可快速使uGUI包含的Text組件，進行簡易的互動' +
            '<br><span class="mark-pinkred">(該組件以 Text 組件的 FontSize 進行變更，因此只能變更Font大小。如需X或Y縮放需使用RectTransformScaler.cs。)</span>' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Rect Transform: 選擇要變更大小的核心組件' +
            '<br><br>Option: 更改欲變更大小的互動方式' +
            '<br><br>Mutiply Size: 相乘大小，該浮點與Text組件 FontSize 默認值，作乘積' +
            '<br><br>Animation Speed: 動畫速度' +
            '<br><br>Enter Speed: 互動\'開始\'的動畫曲線' +
            '<br><br>Leave Speed: 互動\'結束\'的動畫曲線' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-LegacyTextSizer-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-LegacyTextSizer-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">LegacyTextSizer.cs  </div></pre>' +

            '<!-- Code -->' +
            '<pre class="re-link"><div class="no-select" style="color: white;width: 100%; margin-bottom: -50px;text-align: center;white-space: pre-line;">' +
            '<br><br><br><h2>TMPTextSizer</h2>' +
            '<h6>' +
            '<br><br>作用: 使用 TMPTextSizer.cs 组件至 unity uGUI' +
            '<br>可快速使TextMeshPro包含的TextMeshProUGUI組件，進行簡易的互動' +
            '<br><span class="mark-pinkred">(該組件以 TextMeshProUGUI 組件的 FontSize 進行變更，因此只能變更Font大小。如需X或Y縮放需使用RectTransformScaler.cs。)</span>' +

            '<span class="mark-place">' +
            '<br><br><br><br>&lt;&lt;=== Unity Inspector Display Variable ===&gt;&gt;' +
            '<br><br>Rect Transform: 選擇要變更大小的核心組件' +
            '<br><br>Option: 更改欲變更大小的互動方式' +
            '<br><br>Mutiply Size: 相乘大小，該浮點與TextMeshProUGUI組件 FontSize 默認值，作乘積' +
            '<br><br>Animation Speed: 動畫速度' +
            '<br><br>Enter Speed: 互動\'開始\'的動畫曲線' +
            '<br><br>Leave Speed: 互動\'結束\'的動畫曲線' +
            '</span>' +
            '</h6>' +
            '<br><br><br><br></div><div id="code-copy-TMPTextSizer-cs" class="no-select" style="z-index: 1;cursor: pointer;color: white;background-color: #1e1e1e;position: relative;margin-bottom: 0px;height: 21px; border-top-left-radius: 7px;border-top-right-radius: 7px;"> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> copy </div><code class="languange-hlsl" id="code-text-TMPTextSizer-cs">' +
            '</code><div class="no-select download-file" style="cursor: pointer;z-index: 0.5;color: white;background-color: #303030;margin-top: 0px;height: 25px; border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;display: flex;align-items: center;justify-content: right;" title="下載">TMPTextSizer.cs  </div></pre>';
        document.body.innerHTML += src;
        redis(300);
        setTimeout(() => {
            fileutils.filetextinelements(['code-text-RectTransformSizer-cs',
                'code-text-RectTransformScaler-cs',
                'code-text-LegacyTextSizer-cs',
                'code-text-TMPTextSizer-cs'],
                ['Resource/OriginFile/csharpFile/UI/Sizer/RectTransformSizer.cs',
                    'Resource/OriginFile/csharpFile/UI/Sizer/RectTransformScaler.cs',
                    'Resource/OriginFile/csharpFile/UI/Sizer/LegacyTextSizer.cs',
                    'Resource/OriginFile/csharpFile/UI/Sizer/TMPTextSizer.cs'], (t, text) => {
                        t.textContent = text;
                    }, () => {
                        if (ck) {
                            copycode("code-copy-RectTransformSizer-cs", "code-text-RectTransformSizer-cs");
                            copycode("code-copy-RectTransformScaler-cs", "code-text-RectTransformScaler-cs");
                            copycode("code-copy-LegacyTextSizer-cs", "code-text-LegacyTextSizer-cs");
                            copycode("code-copy-TMPTextSizer-cs", "code-text-TMPTextSizer-cs");
                            var downloadFiler = document.querySelectorAll('.download-file');
                            downloadFiler.forEach(function (e) {
                                e.addEventListener("click", () => {
                                    if (e.innerText === "RectTransformSizer.cs  ") {
                                        fileutils.download('RectTransformSizer.cs', 'Resource/OriginFile/csharpFile/UI/Sizer/RectTransformSizer.cs');
                                    }
                                    if (e.innerText === "RectTransformScaler.cs  ") {
                                        fileutils.download('RectTransformScaler.cs', 'Resource/OriginFile/csharpFile/UI/Sizer/RectTransformScaler.cs');
                                    }
                                    if (e.innerText === "LegacyTextSizer.cs  ") {
                                        fileutils.download('LegacyTextSizer.cs', 'Resource/OriginFile/csharpFile/UI/Sizer/LegacyTextSizer.cs');
                                    }
                                    if (e.innerText === "TMPTextSizer.cs  ") {
                                        fileutils.download('TMPTextSizer.cs', 'Resource/OriginFile/csharpFile/UI/Sizer/TMPTextSizer.cs');
                                    }
                                });
                            });
                            hljs.highlightAll();
                        }
                    });
        }, 100);
    }
    function relink() {
        var elmt = document.querySelectorAll('.re-link');
        elmt.forEach(element => {
            element.remove();
        });
    }
    function redis(t = 150) {
        var elmt = document.querySelectorAll('.re-link');
        elmt.forEach(element => {
            element.style.display = "none";
            setTimeout(() => {
                element.style.display = "none";
                element.removeAttribute("style");
            }, t);
        });
    }
}());
libdocument.init();