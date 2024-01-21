const express = require('express');
const router = express.Router();
const axios = require('axios');

const CRACKEDDEVS_API_KEY = 'fe1698b4-99f3-442c-9d60-a3372a8f13dd'; 
const CRACKEDDEVS_BASE_URL = 'https://api.crackeddevs.com/api/get-jobs';

router.get('/searchJobs', async (req, res) => {
    try {
        const { keyword, min_salary, max_salary, job_type, skill_levels, degree_required, technologies } = req.query;
        let query = `?limit=10`; 

        if (keyword) query += `&keyword=${encodeURIComponent(keyword)}`;
        if (min_salary) query += `&min_salary=${min_salary}`;
        if (max_salary) query += `&max_salary=${max_salary}`;
        if (job_type) query += `&job_types=${job_type}`;
        if (skill_levels) query += `&skill_levels=${skill_levels}`;
        if (degree_required) query += `&degree_required=${degree_required}`;
        if (technologies) query += `&technologies=${technologies}`;

        const response = await axios.get(`${CRACKEDDEVS_BASE_URL}${query}`, {
            headers: {
                'api-key': CRACKEDDEVS_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Error fetching jobs');
    }
});

module.exports = router;