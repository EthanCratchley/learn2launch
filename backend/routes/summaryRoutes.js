const express = require('express');
const router = express.Router();
const { generateSummary } = require('../utils/openai'); 

router.post('/generateSummary', async (req, res) => {
    try {
        const summary = await generateSummary(req.body.topic);
        res.json({ summary });
    } catch (error) {
        console.error('Error in generating summary:', error);
        res.status(500).send('Error generating summary');
    }
});

module.exports = router;