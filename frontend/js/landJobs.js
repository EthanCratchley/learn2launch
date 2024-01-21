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
