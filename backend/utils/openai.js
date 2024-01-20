const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateFlashcards(prompt) {
  try {
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Create flashcards for the following topic: ${prompt}. Each flashcard should have a clear question and a corresponding answer.`,
        max_tokens: 350,
        n: 1,
        //stop: ["\nQuestion:", "\nAnswer:"]
    });
      
      console.log('API Response:', response); 

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
      if (parts.length < 2) {
        console.log('Incomplete flashcard parts:', parts);
        // Handle the incomplete data or return a placeholder
        return { question: 'Undefined', answer: 'Undefined' };
      }
      return { question: parts[0], answer: parts[1] };
    });
  }
  
  

module.exports = { generateFlashcards };
