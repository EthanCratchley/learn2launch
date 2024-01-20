const { OpenAI } = require('openai');
console.log(process.env.OPENAI_API_KEY); // Should output the actual API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateFlashcards(prompt) {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Create flashcards for the following topic: ${prompt}\n\n`,
      max_tokens: 300,
      n: 1,
      stop: ["\n", "Question:", "Answer:"],
    });

    const flashcards = parseResponseToFlashcards(response.choices);
    return flashcards;
  } catch (error) {
    console.error('Error with the OpenAI API:', error);
    throw error;
  }
}

function parseResponseToFlashcards(choices) {
  return choices.map(choice => {
    const parts = choice.text.trim().split('\n');
    return { question: parts[0], answer: parts[1] };
  });
}

module.exports = { generateFlashcards };
