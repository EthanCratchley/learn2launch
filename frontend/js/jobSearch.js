document.getElementById('searchJobsBtn').addEventListener('click', fetchJobs);

const API_KEY = 'fe1698b4-99f3-442c-9d60-a3372a8f13dd'; // Replace with your actual API key

async function fetchJobs() {
    try {
        const response = await fetch(`https://api.crackeddevs.com/api/get-jobs?limit=10`, {
            headers: { 'api-key': API_KEY }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jobs = await response.json();
        displayJobs(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobsContainer');
    jobsContainer.innerHTML = '';

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job';
        jobElement.innerHTML = `
            <h3>${job.title} at ${job.company}</h3>
            <p>${job.description}</p>
            <a href="${job.url}" target="_blank">View Job</a>
        `;
        jobsContainer.appendChild(jobElement);
    });
}
