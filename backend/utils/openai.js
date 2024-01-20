const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateFlashcards(prompt) {
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Create flashcards for the following topic: ${prompt}. Each flashcard should have a clear question and a corresponding answer.`,
            max_tokens: 350,
            n: 1,
        });

        console.log('API Response:', response);

        // Check if response.choices[0].text is a string
        if (typeof response.choices[0].text === 'string') {
            const flashcards = parseResponseToFlashcards(response.choices[0].text);
            return flashcards;
        } else {
            throw new Error('Invalid response format from OpenAI API');
        }
    } catch (error) {
        console.error('Error with the OpenAI API:', error);
        throw error;
    }
}

function parseResponseToFlashcards(responseText) {
    if (typeof responseText !== 'string') {
        throw new Error('Expected a string for parsing flashcards');
    }

    // Splitting flashcards based on a more specific pattern
    const flashcardsRaw = responseText.trim().split('\n\n');
    const flashcards = flashcardsRaw.map(flashcardText => {
        const lines = flashcardText.trim().split('\n');
        if (lines.length >= 2) {
            return {
                question: lines[0].replace('Question:', '').trim(),
                answer: lines[1].replace('Answer:', '').trim()
            };
        }
        return null; // or handle incomplete flashcard data as needed
    }).filter(flashcard => flashcard !== null); // Filter out null values

    return flashcards;
}

module.exports = { generateFlashcards };
