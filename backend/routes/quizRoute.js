const express = require('express');
const { generateQuiz } = require('../utils/openai'); 
const router = express.Router();

router.post('/generateQuiz', async (req, res) => {
    const { topic } = req.body;
    try {
        const quiz = await generateQuiz(topic);
        res.json(quiz);
    } catch (error) {
        console.error('Error in generating quiz:', error);
        res.status(500).json({ message: 'Error generating quiz' });
    }
});

module.exports = router;
