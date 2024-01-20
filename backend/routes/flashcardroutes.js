const express = require('express');
const router = express.Router();
const { generateFlashcards } = require('../utils/openai');

router.post('/generateFlashcards', async (req, res) => {
  const { topic } = req.body;
  try {
    const flashcards = await generateFlashcards(topic);
    res.json(flashcards);
  } catch (error) {
    console.error('Error in generating flashcards:', error);
    res.status(500).json({ message: 'Error generating flashcards' });
  }
});

module.exports = router;
