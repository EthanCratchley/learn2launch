const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit'); 

router.post('/downloadFlashcards', (req, res) => {
    const flashcards = req.body.flashcards; 

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=flashcards.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    flashcards.forEach(card => {
        doc.fontSize(12).text(`Question: ${card.question}`, { underline: true });
        doc.fontSize(12).text(`Answer: ${card.answer}`, { italic: true });
        doc.moveDown();
    });

    doc.end();
});

module.exports = router;
