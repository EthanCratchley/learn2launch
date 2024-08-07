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
        let url = 'http://127.0.0.1:5001/api/searchJobs?'; 
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

    function createJobElement(job) {
        const jobElement = document.createElement('div');
        jobElement.className = 'job';
    
        const title = document.createElement('h3');
        title.textContent = `${job.title} at ${job.company}`;
        jobElement.appendChild(title);
    
        const description = document.createElement('p');
        description.textContent = truncateText(job.description, 200); 
        description.className = 'job-description';
        jobElement.appendChild(description);
    
        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'readbtn'; 
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.onclick = () => toggleFullDescription(description, job.description);
        jobElement.appendChild(readMoreBtn);
    
        const moreInfoLink = document.createElement('a');
        moreInfoLink.href = job.url;
        moreInfoLink.textContent = 'View Job';
        moreInfoLink.target = '_blank';
        moreInfoLink.className = 'view-job-link';
        jobElement.appendChild(moreInfoLink);
    
        return jobElement;
    }
    
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    function toggleFullDescription(element, fullText) {
        if (element.textContent.endsWith('...')) {
            element.textContent = fullText; 
        } else {
            element.textContent = truncateText(fullText, 200);
        }
    }
     
    function displayJobs(jobs) {
        const jobResultsDiv = document.getElementById('jobResults');
        jobResultsDiv.innerHTML = ''; 
    
        jobs.forEach(job => {
            const jobElement = createJobElement(job);
            jobResultsDiv.appendChild(jobElement);
        });
    }
    
    function getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                    .map(input => input.value)
                    .join(',');
    }
});