(async () => {

    //
    // Toggle existing popup
    //
    const existing =
        document.getElementById(
            "ga-shadow-host"
        );

    

    if (existing) {
        existing.remove();
        return;
    }

    //
    // Load extension settings
    //
    const settings =
        await browser.storage.local.get([

            "draggableEnabled",
            "theme",
            "customBg",
            "customText"
        ]);

    //
    // Store globally
    //
    window.__GA_SETTINGS__ =
        settings;

    const data =
        extractGAData();

    createPopup(
        data,
        settings
    );


    observeChanges();

})();


function extractGAData() {

    const scripts =
        document.querySelectorAll("script");

    for (const script of scripts) {

        const text = script.textContent;

        const regex =
            /gaData\.content\s*=\s*(\{[\s\S]*?\});/;

        const match = text.match(regex);

        if (!match || !match[1]) {
            continue;
        }

        try {

            let objectText = match[1];

            objectText =
                objectText.replace(/;$/, "");

            objectText =
                objectText.replace(
                    /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
                    '$1"$2":'
                );

            return JSON.parse(objectText);

        } catch (err) {

            console.error(
                "Parse failed:",
                err
            );
        }
    }

    return null;
}

function createPopup(data, settings) {

    const host =
        document.createElement("div");

    host.id = "ga-shadow-host";

    document.body.appendChild(host);

    const shadow =
        host.attachShadow({
            mode: "closed"
        });

    const style =
        document.createElement("style");

    style.textContent = getStyles();

    shadow.appendChild(style);

    const popup =
        document.createElement("div");

    popup.id = "ga-popup";

    //
    // Header
    //
    const header =
        document.createElement("div");

    header.className = "ga-header";

    const title =
        document.createElement("span");

    title.textContent =
        "DOI Puller";

    const closeBtn =
        document.createElement("button");

    if(settings.draggableEnabled){
        closeBtn.textContent = "";
    }
    else
    {
        closeBtn.textContent = "×";
    }
    

    closeBtn.addEventListener(
        "click",
        () => host.remove()
    );

    header.appendChild(title);
    header.appendChild(closeBtn);

    popup.appendChild(header);

    //
    // Full JSON panel
    //
    popup.appendChild(
        createPanel(
            "Full Data",
            JSON.stringify(data, null, 2)
        )
    );

    //
    // DOI Panel
    //
    popup.appendChild(
        createDOIPanel(
            data?.objectDOI || ""
        )
    );

    //
    // Live theme updater
    //
    window.__GA_UPDATE_THEME__ =
        (settings) => {

            const oldStyle =
                shadow.querySelector("style");

            if (oldStyle) {
                oldStyle.remove();
            }

            window.__GA_SETTINGS__ =
                settings;

            const newStyle =
                document.createElement("style");

            newStyle.textContent =
                getStyles();

            shadow.prepend(newStyle);
        };

    shadow.appendChild(popup);

    //
    // Enable dragging if chosen
    //
    if (settings.draggableEnabled) {
        enableDragging(
            popup,
            header,
            shadow
        );
    }
}

function createPanel(title, content) {

    const wrapper =
        document.createElement("div");

    wrapper.className = "ga-panel";

    const heading =
        document.createElement("div");

    heading.className =
        "ga-panel-title";

    heading.textContent = title;

    const pre =
        document.createElement("pre");

    pre.textContent = content;

    wrapper.appendChild(heading);
    wrapper.appendChild(pre);

    return wrapper;
}

function createDOIPanel(doi) {

    const wrapper =
        document.createElement("div");

    wrapper.className = "ga-panel";

    const heading =
        document.createElement("div");

    heading.className =
        "ga-panel-title";

    heading.textContent =
        "objectDOI";

    const doiText =
        document.createElement("pre");

    doiText.textContent =
        doi || "No DOI found";

    //
    // Copy button
    //
    const copyBtn =
        document.createElement("button");

    copyBtn.className =
        "ga-copy-btn";

    copyBtn.textContent =
        "Copy DOI";

    copyBtn.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    doi
                );

                copyBtn.textContent =
                    "Copied!";

                setTimeout(() => {

                    copyBtn.textContent =
                        "Copy DOI";

                }, 1500);

            } catch (err) {

                console.error(
                    "Clipboard failed:",
                    err
                );
            }
        }
    );

    wrapper.appendChild(heading);
    wrapper.appendChild(doiText);
    wrapper.appendChild(copyBtn);

    return wrapper;
}

function observeChanges() {

    const observer =
        new MutationObserver(() => {

            console.log(
                "[DOI Puller] DOM changed"
            );

        });

    observer.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );
}

function enableDragging(
    element,
    handle
) {

    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;

    handle.style.cursor = "move";

    element.style.position =
        "fixed";

    handle.addEventListener(
        "pointerdown",
        (e) => {

            isDragging = true;

            const rect =
                element.getBoundingClientRect();

            offsetX =
                e.clientX - rect.left;

            offsetY =
                e.clientY - rect.top;

            handle.setPointerCapture(
                e.pointerId
            );
        }
    );

    handle.addEventListener(
        "pointermove",
        (e) => {

            if (!isDragging) {
                return;
            }

            element.style.left =
                (e.clientX - offsetX)
                + "px";

            element.style.top =
                (e.clientY - offsetY)
                + "px";

            element.style.right =
                "auto";
        }
    );

    handle.addEventListener(
        "pointerup",
        () => {

            isDragging = false;

        }
    );
}



function getStyles() {

    const settings =
        window.__GA_SETTINGS__ || {};

    const THEMES = {

        dark: {
            bg: "#1e1e1e",
            text: "#ffffff"
        },

        light: {
            bg: "#ffffff",
            text: "#111111"
        },

        soft: {
            bg: "#2d3748",
            text: "#e2e8f0"
        }
    };

    let bg = "#1e1e1e";
    let text = "#ffffff";

    if (
        settings.theme &&
        settings.theme !== "custom"
    ) {

        bg =
            THEMES[
                settings.theme
            ]?.bg || bg;

        text =
            THEMES[
                settings.theme
            ]?.text || text;

    } else {

        bg =
            settings.customBg || bg;

        text =
            settings.customText || text;
    }

    return `

        #ga-popup {

            position: absolute;

            top: 20px;
            right: 20px;

            width: 460px;

            max-height: 80vh;

            overflow: auto;

            z-index: 2147483647;

            background: ${bg};

            color: ${text};

            border-radius: 12px;

            border: 1px solid #444;

            box-shadow:
                0 10px 40px
                rgba(0,0,0,0.45);

            font-family: Arial;
        }

        .ga-header {

            display: flex;

            justify-content: space-between;

            align-items: center;

            padding: 14px;

            background:
                rgba(255,255,255,0.08);

            border-bottom:
                1px solid rgba(255,255,255,0.1);

            font-weight: bold;
        }

        .ga-panel {

            padding: 14px;

            border-bottom:
                1px solid rgba(255,255,255,0.08);
        }

        .ga-panel-title {

            font-size: 14px;

            font-weight: bold;

            margin-bottom: 10px;

            color: #D4AA00;
        }

        pre {

            margin: 0;

            white-space: pre-wrap;

            word-break: break-word;

            font-size: 12px;

            line-height: 1.5;

            color: ${text};
        }

        button {

            background: transparent;

            border: none;

            color: ${text};

            font-size: 18px;

            cursor: pointer;

            font-weight: bold;
        }

        .ga-copy-btn {

            margin-top: 12px;

            padding: 8px 12px;

            background: #D4AA00;

            border-radius: 6px;

            font-size: 13px;

            color: white;
        }

        .ga-copy-btn:hover {

            background: ##FFCC00;
        }

    `;
}


