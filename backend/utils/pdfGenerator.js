const PDFDocument = require('pdfkit');

function generatePdf(summaryText) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.fontSize(12).text(summaryText, {
            align: 'left',
            width: 410
        });

        doc.end();
    });
}

module.exports = { generatePdf };