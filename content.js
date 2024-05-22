if (chrome.browserAction != undefined) {
    chrome.browserAction.onClicked.addListener((tab) => {
        try {
            chrome.tabs.executeScript(
                tab.id,
                {code: 'document.body.innerText;'},
                function(results) {
                    // results[0] contains the output of 'document.body.innerText;'
                    console.log(results[0]);
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
}

