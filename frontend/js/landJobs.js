document.getElementById('generatePlanBtn').addEventListener('click', function() {
    const jobInfo = document.getElementById('jobInput').value;
    if (!jobInfo) {
        alert('Please paste the job information.');
        return;
    }

    fetch('/api/generatePlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobInfo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        const planOutput = document.getElementById('planOutput');
        planOutput.textContent = data.plan;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate plan. Please try again.');
    });
});

document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    const jobPlanText = document.getElementById('planOutput').textContent; // Assuming 'planOutput' is the ID of your output element

    fetch('/api/downloadJobPlan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: jobPlanText })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'job-plan.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(error => console.error('Error:', error));
});
