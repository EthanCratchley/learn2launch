document.getElementById('jobSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const keyword = document.getElementById('keywordInput').value;
    const minSalary = document.getElementById('minSalaryInput').value;
    const maxSalary = document.getElementById('maxSalaryInput').value;
    const jobType = document.getElementById('jobTypeSelect').value;
    // Get other filter values

    fetch(`/api/searchJobs?keyword=${keyword}&min_salary=${minSalary}&max_salary=${maxSalary}&job_type=${jobType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Include other necessary headers
        }
    })
    .then(response => response.json())
    .then(data => {
        displayJobs(data);
    })
    .catch(error => console.error('Error:', error));
});

function displayJobs(jobs) {
    const jobResultsDiv = document.getElementById('jobResults');
    jobResultsDiv.innerHTML = '';
    
    if (jobs.length === 0) {
        jobResultsDiv.innerHTML = '<p>No jobs found.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';

        const title = document.createElement('h3');
        title.textContent = job.title;
        jobDiv.appendChild(title);

        const company = document.createElement('p');
        company.textContent = `Company: ${job.company}`;
        jobDiv.appendChild(company);

        const description = document.createElement('p');
        description.textContent = job.description;
        jobDiv.appendChild(description);

        const salaryRange = document.createElement('p');
        salaryRange.textContent = `Salary: ${job.min_salary_usd} - ${job.max_salary_usd}`;
        jobDiv.appendChild(salaryRange);

        const jobType = document.createElement('p');
        jobType.textContent = `Job Type: ${job.job_type}`;
        jobDiv.appendChild(jobType);

        const link = document.createElement('a');
        link.href = job.url;
        link.textContent = 'View Job';
        link.target = '_blank';
        jobDiv.appendChild(link);

        jobResultsDiv.appendChild(jobDiv);
    });
}
