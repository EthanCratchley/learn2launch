document.getElementById('generateFlashcardsBtn').addEventListener('click', () => {
    const topic = document.getElementById('flashcardTopicInput').value;
    if (!topic) {
        alert('Please enter a topic to generate flashcards.');
        return;
    }

    fetch('/api/generateFlashcards', {
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
    .then(flashcards => {
        displayFlashcards(flashcards);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate flashcards. Please try again.');
    });
});

function displayFlashcards(flashcards) {
    const displayArea = document.getElementById('flashcardDisplayArea');
    displayArea.innerHTML = ''; // Clear existing content

    flashcards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'flashcard';

        const questionElement = document.createElement('div');
        questionElement.className = 'flashcard-question';
        questionElement.textContent = card.question;

        const answerElement = document.createElement('div');
        answerElement.className = 'flashcard-answer';
        answerElement.textContent = card.answer;

        cardElement.appendChild(questionElement);
        cardElement.appendChild(answerElement);
        displayArea.appendChild(cardElement);
    });
}

  
  
