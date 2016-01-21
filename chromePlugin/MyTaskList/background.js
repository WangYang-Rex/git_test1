chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        sendResponse("bar");
    }
);
console.log("this is background.js reporting for duty");