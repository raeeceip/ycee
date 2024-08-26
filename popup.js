document.getElementById('generate').addEventListener('click', () => {
    const resume = document.getElementById('resume').value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "extractJobDetails" }, (response) => {
            if (response && response.jobDetails) {
                chrome.runtime.sendMessage({
                    action: "generateIntroduction",
                    jobDetails: response.jobDetails,
                    resume: resume
                }, (response) => {
                    if (response && response.introduction) {
                        document.getElementById('result').innerText = response.introduction;
                    } else {
                        document.getElementById('result').innerText = "Failed to generate introduction";
                    }
                });
            } else {
                document.getElementById('result').innerText = "Failed to extract job details";
            }
        });
    });
});