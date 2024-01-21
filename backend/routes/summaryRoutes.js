const express = require('express');
const router = express.Router();
const { generatePdf } = require('../utils/pdfGenerator');
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

router.post('/downloadSummary', async (req, res) => {
    try {
        const summary = req.body.summary;
        const pdfBuffer = await generatePdf(summary); 

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;

