document.getElementById('generateSummaryBtn').addEventListener('click', () => {
    const topic = document.getElementById('summaryTopicInput').value;
    if (!topic) {
        alert('Please enter a topic to generate a summary.');
        return;
    }

    fetch('/api/generateSummary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        // Display the summary
        const displayArea = document.getElementById('summaryDisplayArea');
        displayArea.textContent = data.summary;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate summary. Please try again.');
    });
});