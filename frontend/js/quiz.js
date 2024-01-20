document.getElementById('generateQuizBtn').addEventListener('click', () => {
    const topic = document.getElementById('quizInput').value;
    if (!topic) {
        alert('Please enter a topic to generate a quiz.');
        return;
    }

    fetch('/api/generateQuiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(quiz => {
        displayQuiz(quiz);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate quiz. Please try again.');
    });
});

function displayQuiz(quiz) {
    const displayArea = document.getElementById('quizDisplayArea');
    displayArea.innerHTML = ''; // Clear existing content

    quiz.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'quiz-question';
        questionElement.textContent = `Q: ${question.question}`;

        const answerElement = document.createElement('div');
        answerElement.className = 'quiz-answer';
        answerElement.textContent = `Answer: ${question.answer}`;

        displayArea.appendChild(questionElement);
        displayArea.appendChild(answerElement);
    });
}
