const targetPrefix = "https://www.google.";

function clearHistoryByPrefix({ url }) {
    if (url.startsWith(targetPrefix)) {
        chrome.history.deleteUrl({ url }, () => {
            if (chrome.runtime.lastError) {
                console.error("Failed to delete URL: " + url, chrome.runtime.lastError);
            }
        });
    }
}

chrome.history.onVisited.addListener(clearHistoryByPrefix);

// Clear old history within the last month when the extension is installed or updated
function initialize() {
    const oneMonthAgo = Date.now() - 1000 * 60 * 60 * 24 * 30;

    chrome.history.search({ text: "", startTime: oneMonthAgo }, (results) => {
        results.forEach(clearHistoryByPrefix);
    });
}

chrome.runtime.onInstalled.addListener(initialize);
