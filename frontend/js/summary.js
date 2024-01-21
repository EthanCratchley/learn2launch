let currentSummaryData = '';

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
        const displayArea = document.getElementById('summaryDisplayArea');
        displayArea.textContent = data.summary;
        currentSummaryData = data.summary; // Store the summary data for download
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate summary. Please try again.');
    });
});

document.getElementById('downloadSummaryPdfBtn').addEventListener('click', function() {
    fetch('/api/downloadSummary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary: currentSummaryData })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'summary.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(error => console.error('Error:', error));
});
