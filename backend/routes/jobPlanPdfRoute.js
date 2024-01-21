const PDFDocument = require('pdfkit');
const express = require('express');
const router = express.Router();

router.post('/api/downloadJobPlan', (req, res) => {
    const { text } = req.body;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=job-plan.pdf');
    doc.pipe(res);

    doc.fontSize(12).text(text, {
        align: 'left',
        lineGap: 4
    });

    doc.end();
});

module.exports = router;
