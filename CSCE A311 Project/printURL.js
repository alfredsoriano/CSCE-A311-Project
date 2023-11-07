chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // NOTE: MUST USE ANYTHING THAT USES THE 'URL' VARIABLE INSIDE THIS QUERY




    document.getElementById("current-url").innerHTML = "Current URL:" + "<br/>" + url;




    
});
