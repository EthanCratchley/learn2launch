const express = require('express');
const router = express.Router();
const { generatePlanForJob } = require('../utils/openai'); // You need to create this function

router.post('/generatePlan', async (req, res) => {
    try {
        const plan = await generatePlanForJob(req.body.jobInfo);
        res.json({ plan });
    } catch (error) {
        console.error('Error in generating plan:', error);
        res.status(500).send('Error generating plan');
    }
});

module.exports = router;