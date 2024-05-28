
document.getElementById('changeTitle').addEventListener('click', () => {
    let title = document.getElementById('titleInput').value; // Assuming you have an input field with id 'titleInput'
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: function(title) {
                document.title = title;
            },
            args: [title]
        });
    });
});


// document.getElementById('autoUpdate').addEventListener('click', () => {
//     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//         chrome.scripting.executeScript({
//             target: {tabId: tabs[0].id},
//             func: () => {
//                 document.title = "Lora"; // Change the title of the tab to "Lora"
//             }
//         });
//     });
// });


document.getElementById('autoUpdate').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let tabTitle = tabs[0].title;
        let story = `Write  ${tabTitle} in one or two words.`;
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: function(story) {
                fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key= your apikey', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "contents": [{
                            "parts":[{
                                "text": story
                            }]
                        }]
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    // Assuming the API returns the generated title in 'data.title'
                    console.log()
                    const newTitle =data.candidates[0].content.parts[0].text || 'Defa Title';
                    document.title = newTitle;
                })
                .catch((error) => {
                    console.error('Error:');
                });
            },
            args: [story]
        });
    });
});
