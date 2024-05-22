

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.newTitle && sender.tab) {
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            function: updateTabTitle,
            args: [request.newTitle]
        });
    }
});
function updateTabTitle(newTitle) {
    document.title = newTitle;
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab){
            console.log(tab.url); // Log the URL of each tab
        });
    });
    
}

