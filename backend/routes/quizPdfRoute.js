const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

router.post('/downloadQuiz', (req, res) => {
    const quiz = req.body.quiz;
    const doc = new PDFDocument();

    res.setHeader('Content-disposition', 'attachment; filename=quiz.pdf');
    res.setHeader('Content-type', 'application/pdf');

    quiz.forEach((q) => {
        doc.fontSize(14).text(`Q: ${q.question}`);
        doc.fontSize(12).text(`Answer: ${q.answer}\n\n`);
    });

    doc.pipe(res);
    doc.end();
});

module.exports = router;
