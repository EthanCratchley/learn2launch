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

async function generateQuiz(topic) {
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Create a quiz for the following topic: ${topic}. Provide 10 questions with their answers.`,
            max_tokens: 700,
            n: 1,
        });

        console.log('API Response:', response);

        if (typeof response.choices[0].text === 'string') {
            const quiz = parseResponseToQuiz(response.choices[0].text);
            return quiz;
        } else {
            throw new Error('Invalid response format from OpenAI API');
        }
    } catch (error) {
        console.error('Error with the OpenAI API:', error);
        throw error;
    }
}

function parseResponseToQuiz(responseText) {
    if (typeof responseText !== 'string') {
        throw new Error('Expected a string for parsing quiz');
    }

    const quizQuestionsRaw = responseText.trim().split('\n\n');
    const quiz = quizQuestionsRaw.map(questionText => {
        const lines = questionText.trim().split('\n');
        if (lines.length >= 2) {
            return {
                question: lines[0].replace('Question:', '').trim(),
                answer: lines[1].replace('Answer:', '').trim()
            };
        }
        return null; 
    }).filter(question => question !== null); 

    return quiz;
}

async function generateSummary(topic) {
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Write a comprehensive summary about the following topic: ${topic}`,
            max_tokens: 1000, 
            n: 1
        });

        // Process the response and return the summary text
        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error with the OpenAI API:', error);
        throw error;
    }
}   

    async function generatePlanForJob(jobInfo) {
        // Call to OpenAI API
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Create a plan for preparing for an interview, creating a resume, or getting a job based on the following information:\n\n${jobInfo}`,
            max_tokens: 300
        });
    
        if (response && response.choices && response.choices.length > 0) {
            return response.choices[0].text.trim();
        } else {
            throw new Error('Invalid response from OpenAI API');
        }
    }
    
module.exports = { generateFlashcards, generateQuiz, generateSummary, generatePlanForJob };