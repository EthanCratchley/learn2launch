let currentQuizData = [];

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
        currentQuizData = quiz;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate quiz. Please try again.');
    });
});

function displayQuiz(quiz) {
    const displayArea = document.getElementById('quizDisplayArea');
    displayArea.innerHTML = ''; 

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

document.getElementById('downloadQuizPdfBtn').addEventListener('click', function() {
    fetch('/api/downloadQuiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quiz: currentQuizData })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'quiz.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(error => console.error('Error:', error));
});
