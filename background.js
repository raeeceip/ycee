chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateIntroduction") {
        const { jobDetails, resume } = request;

        // Replace with your actual Claude API endpoint and key
        fetch('https://api.anthropic.com/v1/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_CLAUDE_API_KEY'
            },
            body: JSON.stringify({
                model: "claude-3-opus-20240229",
                messages: [
                    {
                        role: "user",
                        content: `Given the following job details and resume, generate a brief introduction for a job application:
  
  Job Details:
  ${jobDetails}
  
  Resume:
  ${resume}
  
  Please provide a concise and personalized introduction highlighting relevant skills and experiences.`
                    }
                ],
                max_tokens: 500
            })
        })
            .then(response => response.json())
            .then(data => {
                sendResponse({ introduction: data.content[0].text });
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ error: 'Failed to generate introduction' });
            });

        return true; // Indicates that the response is asynchronous
    }
});