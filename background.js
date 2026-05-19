browser.commands.onCommand.addListener(async (command) => {

    console.log("[DOI Puller] Command fired:", command);

    if (command !== "toggle-extractor") {
        return;
    }

    try {

        const [tab] = await browser.tabs.query({
            active: true,
            currentWindow: true
        });

        if (!tab?.id) {
            console.warn("[DOI Puller] No active tab found");
            return;
        }

        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });

    } catch (err) {
        console.error("[DOI Puller] Shortcut execution failed:", err);
    }
});

