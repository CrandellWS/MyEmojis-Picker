(function addEmojiPicker() {
    if (document.getElementById('mpe-trigger')) return; // prevent double-init

    const STORAGE_KEY = 'myprize_emoji_recent';
    const MAX_RECENT = 25;

    // Preloaded defaults — best of the best for slot chat
    const PRELOAD_DEFAULTS = [
        "🔥","💯","🎉","🥳","🎰","💎","💵","🤑","🏆","👑",
        "😱","🤯","🙌","🖨️","💸","😂","💀","🤣","😭","🤦",
        "🙏","👀","🦄","✨","🌈"
    ];

    const CATEGORIES = {
        recent: {
            label: "⏱", title: "Recent",
            emojis: [] // filled dynamically
        },
        win: {
            label: "🏆", title: "Win",
            emojis: [
                "🔥","💯","🎉","🥳","🚀","💥","⚡","💎","💵","💰",
                "🤑","🏆","👑","😱","🤯","🤩","😍","🙌","🫡","🎊",
                "🥂","🍾","💫","✨","🌟","⭐","🎆","🎇","🪄","🎰"
            ]
        },
        loss: {
            label: "😭", title: "Loss",
            emojis: [
                "😭","😔","😤","😒","😡","🤬","🤦","😮‍💨","😓","💀",
                "🤡","😵‍💫","🧂","👎","😬","😩","😢","🫠","🙃","😑",
                "💔","🫤","🪦","😰","🤕","😞","😟","🫥","😣","🫨"
            ]
        },
        seasonal: {
            label: "🎄", title: "Seasonal",
            emojis: [
                "🎃","🎄","🎅","🤶","🎁","🎊","🎆","🎇","🌸","🍂",
                "🌻","🌈","🌊","🏖️","❄️","⛄","🎋","🍀","☘️","🌺",
                "🦃","🥧","🌵","🎑","🎍","🎐","🎏","🏮","🥚","🐣"
            ]
        },
        feels: {
            label: "😂", title: "Feels",
            emojis: [
                "😂","🤣","💀","🤯","😍","🥲","😅","😊","🫶","❤️",
                "👀","😳","🫣","👏","🤝","✌️","🙌","🫡","🤞","🙏",
                "🧍","🍻","🍺","🔄","😈","🤭","🫢","😏","🥹","😬"
            ]
        },
        printer: {
            label: "🖨️", title: "Printer",
            emojis: [
                "🖨️","💸","💵","💴","💶","💷","💰","🤑","💲","💳",
                "🪙","💎","🎰","🃏","🎲","7️⃣","🍒","🍀","🏦","🔑",
                "🦄","🌈","✨","💫","🎠","🎡","🎢","🎪","🎭","🏅"
            ]
        }
    };

    // Keyword search map
    const KEYWORDS = {
        "🔥":["fire","hot","lit","hype","flame"],
        "💯":["hundred","perfect","100","facts"],
        "🎉":["party","celebrate","congrats","tada"],
        "🥳":["party","birthday","celebrate"],
        "🚀":["rocket","launch","moon","blast"],
        "💥":["boom","explosion","bang","pop"],
        "⚡":["lightning","electric","zap","bolt"],
        "💎":["diamond","gem","rare","crystal"],
        "💵":["money","cash","bills","dollar"],
        "💰":["money","bag","cash","rich"],
        "🤑":["money","rich","greedy","cash"],
        "🏆":["trophy","win","winner","champion"],
        "👑":["crown","king","queen","royal"],
        "😱":["scream","shock","omg","scared"],
        "🤯":["mind blown","shocked","wow","crazy"],
        "😍":["love","heart eyes","cute"],
        "🙌":["hands","praise","celebrate","clap"],
        "🎰":["slots","casino","gamble","machine"],
        "💸":["money","flying","cash","spend"],
        "🖨️":["printer","print","money printer","printing"],
        "💀":["skull","dead","lmao","rip"],
        "😂":["laugh","lol","haha","funny"],
        "🤣":["laugh","rolling","funny","lmao"],
        "😭":["cry","sad","tears","sob"],
        "🤦":["facepalm","smh","ugh"],
        "🙏":["pray","please","thanks","hope"],
        "👀":["eyes","look","watching","sus"],
        "😳":["flushed","shocked","surprised"],
        "🦄":["unicorn","rare","magic","special"],
        "✨":["sparkle","magic","shine","glitter"],
        "🌈":["rainbow","color","pride","beauty"],
        "🧂":["salt","salty","triggered"],
        "👎":["thumbs down","bad","no","dislike"],
        "🔥":["fire","hot"],
        "🍒":["cherry","slots","lucky"],
        "🍀":["clover","lucky","luck"],
        "7️⃣":["seven","lucky","jackpot","slots"],
        "🪙":["coin","gold","money"],
        "💳":["card","credit","swipe"],
        "🎲":["dice","gamble","random","roll"],
        "🃏":["joker","card","wild"],
        "🏦":["bank","money","vault"],
        "🥂":["cheers","toast","celebrate","win"],
        "🍾":["champagne","celebrate","pop","win"],
        "😤":["frustrated","mad","puffing","ugh"],
        "😡":["angry","mad","rage","furious"],
        "🤬":["cursing","rage","angry","mad"],
        "🧂":["salt","salty"],
        "😮‍💨":["sigh","phew","exhale","relief"],
        "💔":["broken heart","sad","heartbreak"],
        "🎄":["christmas","xmas","holiday"],
        "🎃":["halloween","pumpkin","spooky"],
        "❄️":["snow","cold","winter","ice"],
        "🌸":["spring","flower","cherry blossom"],
        "🍂":["fall","autumn","leaves"]
    };

    let currentTab = 'recent';
    let recentList = [];
    let searchQuery = '';

    function getRecent() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch(e) {}
        localStorage.setItem(STORAGE_KEY, JSON.stringify(PRELOAD_DEFAULTS));
        return [...PRELOAD_DEFAULTS];
    }

    function addToRecent(emoji) {
        recentList = recentList.filter(e => e !== emoji);
        recentList = [emoji, ...recentList].slice(0, MAX_RECENT);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentList));
    }

    function getSearchResults(query) {
        const q = query.toLowerCase();
        const all = [...new Set(Object.values(CATEGORIES).flatMap(c => c.emojis))];
        return all.filter(e => {
            if (e.includes(q)) return true;
            const tags = KEYWORDS[e] || [];
            return tags.some(t => t.includes(q));
        });
    }

    const wait = setInterval(() => {
        const input = document.querySelector('textarea[placeholder="Send a message"]');
        if (!input) return;
        clearInterval(wait);

        recentList = getRecent();

        const wrapper = input.parentElement;
        wrapper.style.position = "relative";

        // === TRIGGER BUTTON ===
        const triggerBtn = document.createElement("div");
        triggerBtn.id = "mpe-trigger";
        triggerBtn.textContent = "🎰";
        Object.assign(triggerBtn.style, {
            position: "absolute",
            left: "8px",
            top: "8px",
            cursor: "pointer",
            fontSize: "20px",
            userSelect: "none",
            zIndex: "10",
            opacity: "0.8",
            transition: "opacity 0.15s, transform 0.15s"
        });
        triggerBtn.onmouseenter = () => { triggerBtn.style.opacity = "1"; triggerBtn.style.transform = "scale(1.15)"; };
        triggerBtn.onmouseleave = () => { triggerBtn.style.opacity = "0.8"; triggerBtn.style.transform = "scale(1)"; };
        input.style.paddingLeft = "38px";

        // === POPUP ===
        const popup = document.createElement("div");
        popup.id = "mpe-popup";
        Object.assign(popup.style, {
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "0",
            background: "#111827",
            color: "#fff",
            borderRadius: "14px",
            display: "none",
            zIndex: "9999",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
            width: "295px",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden"
        });

        // === HEADER ===
        const header = document.createElement("div");
        Object.assign(header.style, {
            padding: "10px 12px 8px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.2)"
        });

        const titleRow = document.createElement("div");
        Object.assign(titleRow.style, {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px"
        });

        const titleEl = document.createElement("span");
        titleEl.textContent = "🎰 MyEmojis";
        Object.assign(titleEl.style, { fontSize: "13px", fontWeight: "700", color: "#f0c040", letterSpacing: "0.3px" });

        const closeBtn = document.createElement("span");
        closeBtn.textContent = "✕";
        Object.assign(closeBtn.style, { cursor: "pointer", fontSize: "13px", color: "#666", padding: "2px 4px", borderRadius: "4px", transition: "color 0.1s" });
        closeBtn.onmouseenter = () => closeBtn.style.color = "#fff";
        closeBtn.onmouseleave = () => closeBtn.style.color = "#666";
        closeBtn.onclick = () => popup.style.display = "none";

        titleRow.appendChild(titleEl);
        titleRow.appendChild(closeBtn);

        // Search input
        const searchInput = document.createElement("input");
        searchInput.placeholder = "🔍  Search... (fire, money, unicorn...)";
        searchInput.type = "text";
        Object.assign(searchInput.style, {
            width: "100%",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "7px",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "12px",
            boxSizing: "border-box",
            outline: "none"
        });
        searchInput.addEventListener('focus', () => searchInput.style.borderColor = "rgba(240,192,64,0.5)");
        searchInput.addEventListener('blur', () => searchInput.style.borderColor = "rgba(255,255,255,0.12)");
        searchInput.oninput = () => {
            searchQuery = searchInput.value.trim();
            renderGrid();
        };

        header.appendChild(titleRow);
        header.appendChild(searchInput);

        // === QUICK PICKS ROW ===
        const quickSection = document.createElement("div");
        Object.assign(quickSection.style, {
            padding: "6px 10px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(240,192,64,0.04)"
        });

        const quickLabel = document.createElement("div");
        quickLabel.textContent = "⚡ Quick picks";
        Object.assign(quickLabel.style, { fontSize: "10px", color: "#666", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" });

        const quickRow = document.createElement("div");
        Object.assign(quickRow.style, { display: "flex", gap: "4px" });

        function renderQuickPicks() {
            quickRow.innerHTML = "";
            const picks = recentList.slice(0, 5);
            // Pad with defaults if needed
            PRELOAD_DEFAULTS.forEach(e => { if (picks.length < 5 && !picks.includes(e)) picks.push(e); });
            picks.slice(0, 5).forEach(e => {
                const span = createEmojiBtn(e, "26px", true);
                quickRow.appendChild(span);
            });
        }

        quickSection.appendChild(quickLabel);
        quickSection.appendChild(quickRow);

        // === TABS ===
        const tabBar = document.createElement("div");
        Object.assign(tabBar.style, {
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.15)",
            overflowX: "auto",
            scrollbarWidth: "none"
        });

        const tabEls = {};
        Object.entries(CATEGORIES).forEach(([key, cat]) => {
            const tab = document.createElement("button");
            tab.textContent = cat.label;
            tab.title = cat.title;
            Object.assign(tab.style, {
                background: "none",
                border: "none",
                borderBottom: "2px solid transparent",
                color: "#777",
                cursor: "pointer",
                padding: "7px 11px",
                fontSize: "15px",
                transition: "all 0.15s",
                flexShrink: "0"
            });
            tab.onmouseenter = () => { if (currentTab !== key) tab.style.color = "#ccc"; };
            tab.onmouseleave = () => { if (currentTab !== key) tab.style.color = "#777"; };
            tab.onclick = () => {
                currentTab = key;
                searchInput.value = "";
                searchQuery = "";
                Object.entries(tabEls).forEach(([k, t]) => {
                    t.style.borderBottom = "2px solid transparent";
                    t.style.color = k === key ? "#f0c040" : "#777";
                });
                tab.style.borderBottom = "2px solid #f0c040";
                tab.style.color = "#f0c040";
                renderGrid();
            };
            tabEls[key] = tab;
            tabBar.appendChild(tab);
        });

        // === GRID LABEL ===
        const gridLabel = document.createElement("div");
        gridLabel.id = "mpe-grid-label";
        Object.assign(gridLabel.style, {
            fontSize: "10px",
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            padding: "6px 12px 2px"
        });

        // === EMOJI GRID ===
        const grid = document.createElement("div");
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1px",
            padding: "4px 8px 10px",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.15) transparent"
        });

        // === EMPTY STATE ===
        const emptyState = document.createElement("div");
        Object.assign(emptyState.style, {
            padding: "20px",
            textAlign: "center",
            color: "#555",
            fontSize: "13px",
            display: "none"
        });
        emptyState.textContent = "No emojis found";

        function createEmojiBtn(e, size = "28px", isQuick = false) {
            const span = document.createElement("span");
            span.textContent = e;
            Object.assign(span.style, {
                fontSize: size,
                cursor: "pointer",
                borderRadius: "7px",
                padding: isQuick ? "3px 5px" : "5px",
                textAlign: "center",
                transition: "background 0.1s, transform 0.1s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none"
            });
            span.onmouseenter = () => { span.style.background = "rgba(255,255,255,0.1)"; span.style.transform = "scale(1.2)"; };
            span.onmouseleave = () => { span.style.background = "transparent"; span.style.transform = "scale(1)"; };
            span.onclick = () => {
                insertEmoji(e);
                addToRecent(e);
                renderQuickPicks();
                if (currentTab === 'recent') renderGrid();
            };
            return span;
        }

        function renderGrid() {
            grid.innerHTML = "";
            let emojis = [];
            let label = "";

            if (searchQuery) {
                emojis = getSearchResults(searchQuery);
                label = emojis.length ? `Results for "${searchQuery}"` : "";
            } else if (currentTab === 'recent') {
                emojis = [...recentList];
                if (emojis.length < 25) {
                    PRELOAD_DEFAULTS.forEach(e => { if (!emojis.includes(e)) emojis.push(e); });
                }
                emojis = emojis.slice(0, 25);
                label = "25 Most Recent";
            } else {
                emojis = CATEGORIES[currentTab].emojis;
                label = CATEGORIES[currentTab].title;
            }

            gridLabel.textContent = label;

            if (emojis.length === 0) {
                emptyState.style.display = "block";
                grid.style.display = "none";
            } else {
                emptyState.style.display = "none";
                grid.style.display = "grid";
                emojis.forEach(e => grid.appendChild(createEmojiBtn(e)));
            }
        }

        function insertEmoji(e) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const val = input.value;
            const newVal = val.substring(0, start) + e + val.substring(end);
            input.value = newVal;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.focus();
            input.selectionStart = input.selectionEnd = start + e.length;
            popup.style.display = "none";
        }

        // Set initial active tab styling
        tabEls['recent'].style.borderBottom = "2px solid #f0c040";
        tabEls['recent'].style.color = "#f0c040";

        // === ASSEMBLE ===
        popup.appendChild(header);
        popup.appendChild(quickSection);
        popup.appendChild(tabBar);
        popup.appendChild(gridLabel);
        popup.appendChild(grid);
        popup.appendChild(emptyState);

        renderQuickPicks();
        renderGrid();

        // === TOGGLE ===
        triggerBtn.onclick = (ev) => {
            ev.stopPropagation();
            const isOpen = popup.style.display !== "none";
            popup.style.display = isOpen ? "none" : "block";
            if (!isOpen) {
                recentList = getRecent();
                renderQuickPicks();
                renderGrid();
                setTimeout(() => searchInput.focus(), 60);
            }
        };

        // Close on outside click
        document.addEventListener('click', (ev) => {
            if (!popup.contains(ev.target) && ev.target !== triggerBtn) {
                popup.style.display = "none";
            }
        }, true);

        // Close on Escape
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && popup.style.display !== "none") {
                popup.style.display = "none";
                input.focus();
            }
        });

        wrapper.appendChild(triggerBtn);
        wrapper.appendChild(popup);

        console.log("MyPrize Slot Emoji Picker v2 Loaded.");
    }, 300);
})();
