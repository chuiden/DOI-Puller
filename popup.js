const runBtn =
    document.getElementById("runBtn");

const dragToggle =
    document.getElementById("draggableToggle");

const themeSelect =
    document.getElementById("themeSelect");

const bgColor =
    document.getElementById("bgColor");

const textColor =
    document.getElementById("textColor");

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

//
// Apply popup theme
//
function applyPopupTheme(
    theme,
    customBg,
    customText
) {

    let bg;
    let text;

    if (theme === "custom") {

        bg = customBg;
        text = customText;

    } else {

        bg =
            THEMES[theme]?.bg
            || "#1e1e1e";

        text =
            THEMES[theme]?.text
            || "#ffffff";
    }

    document.body.style.background =
        bg;

    document.body.style.color =
        text;
}

//
// Load settings
//
(async () => {

    const settings =
        await browser.storage.local.get([

            "draggableEnabled",

            "theme",

            "customBg",

            "customText"
        ]);

    dragToggle.checked =
        settings.draggableEnabled || false;

    const theme =
        settings.theme || "dark";

    themeSelect.value = theme;

    if (theme === "custom") {

        bgColor.value =
            settings.customBg
            || "#1e1e1e";

        textColor.value =
            settings.customText
            || "#ffffff";

    } else {

        bgColor.value =
            THEMES[theme].bg;

        textColor.value =
            THEMES[theme].text;
    }

    applyPopupTheme(
        theme,
        bgColor.value,
        textColor.value
    );

})();

//
// Persist dragging
//
dragToggle.addEventListener(
    "change",
    async () => {

        await browser.storage.local.set({

            draggableEnabled:
                dragToggle.checked
        });

    }
);

//
// Theme changes
//
themeSelect.addEventListener(
    "change",
    async () => {

        const selected =
            themeSelect.value;

        if (selected !== "custom") {

            bgColor.value =
                THEMES[selected].bg;

            textColor.value =
                THEMES[selected].text;
        }

        await saveTheme();

        applyPopupTheme(
            themeSelect.value,
            bgColor.value,
            textColor.value
        );
    }


);


//
// Custom colors
//
bgColor.addEventListener(
    "input",
    async () => {

        themeSelect.value = "custom";

        await saveTheme();

        applyPopupTheme(
            "custom",
            bgColor.value,
            textColor.value
        );
    }
);

textColor.addEventListener(
    "input",
    async () => {

        themeSelect.value = "custom";

        await saveTheme();

        applyPopupTheme(
            "custom",
            bgColor.value,
            textColor.value
        );
    }
);

//
// Save theme
//
async function saveTheme() {

    await browser.storage.local.set({

        theme:
            themeSelect.value,

        customBg:
            bgColor.value,

        customText:
            textColor.value
    });
}

//
// Toggle popup
//
runBtn.addEventListener(
    "click",
    async () => {

        const [tab] =
            await browser.tabs.query({

                active: true,
                currentWindow: true
            });

        await browser.scripting.executeScript({

            target: {
                tabId: tab.id
            },

            files: ["content.js"]
        });

    }
);

