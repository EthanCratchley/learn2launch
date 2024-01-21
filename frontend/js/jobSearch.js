document.addEventListener('DOMContentLoaded', function() {
    const jobSearchForm = document.getElementById('jobSearchForm');
    const jobResultsDiv = document.getElementById('jobResults');

    jobSearchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const keyword = document.getElementById('keywordInput').value;
        const minSalary = document.getElementById('minSalaryInput').value;
        const maxSalary = document.getElementById('maxSalaryInput').value;
        const jobTypes = getCheckedValues('jobType');
        const skillLevels = getCheckedValues('skillLevel');
        const degreeRequired = document.getElementById('degreeRequiredCheckbox').checked;
        const technologies = getCheckedValues('technologies');

        const apiUrl = buildApiUrl(keyword, minSalary, maxSalary, jobTypes, skillLevels, degreeRequired, technologies);
        fetchJobs(apiUrl);
    });

    function buildApiUrl(keyword, minSalary, maxSalary, jobType, skillLevel, degreeRequired, technologies) {
        let url = 'http://127.0.0.1:5001/api/searchJobs?'; // Replace with your server URL and endpoint
        const params = new URLSearchParams();

        if (keyword) params.append('keyword', keyword);
        if (minSalary) params.append('min_salary', minSalary);
        if (maxSalary) params.append('max_salary', maxSalary);
        if (jobType) params.append('job_type', jobType);
        if (skillLevel) params.append('skill_levels', skillLevel);
        if (degreeRequired) params.append('degree_required', degreeRequired);
        if (technologies) params.append('technologies', technologies);

        return url + params.toString();
    }

    function fetchJobs(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => displayJobs(data))
            .catch(error => console.error('Error:', error));
    }

    function displayJobs(jobs) {
        jobResultsDiv.innerHTML = ''; // Clear previous results
        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job';
            jobElement.innerHTML = `
                <h3>${job.title} at ${job.company}</h3>
                <p>${job.description}</p>
                <a href="${job.url}" target="_blank">View Job</a>
            `;
            jobResultsDiv.appendChild(jobElement);
        });
    }
});

function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                .map(input => input.value)
                .join(',');
}