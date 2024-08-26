function scrollAndExtractJobDetails() {
    return new Promise((resolve) => {
        let jobDetails = "";
        let lastHeight = document.body.scrollHeight;

        function scroll() {
            window.scrollTo(0, document.body.scrollHeight);
            jobDetails += document.body.innerText;

            setTimeout(() => {
                if (document.body.scrollHeight > lastHeight) {
                    lastHeight = document.body.scrollHeight;
                    scroll();
                } else {
                    resolve(jobDetails);
                }
            }, 1000);
        }

        scroll();
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractJobDetails") {
        scrollAndExtractJobDetails().then(jobDetails => {
            sendResponse({ jobDetails: jobDetails });
        });
        return true; // Indicates that the response is asynchronous
    }
});

