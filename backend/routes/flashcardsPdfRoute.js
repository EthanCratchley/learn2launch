const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit'); // You'll need to install pdfkit

router.post('/downloadFlashcards', (req, res) => {
    const flashcards = req.body.flashcards; // Assuming flashcards are sent in the request

    // Create a PDF document
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=flashcards.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // Add flashcards to the PDF
    flashcards.forEach(card => {
        doc.fontSize(12).text(`Question: ${card.question}`, { underline: true });
        doc.fontSize(12).text(`Answer: ${card.answer}`, { italic: true });
        doc.moveDown();
    });

    doc.end();
});

module.exports = router;
