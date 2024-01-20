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
    displayArea.innerHTML = ''; // Clear previous flashcards
  
    flashcards.forEach(card => {
      if (card.question && card.answer) {
        // Your existing code to create and append flashcard elements
      } else {
        console.log('Incomplete flashcard data:', card);
        // Display a message or handle the incomplete data
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Flashcard data is incomplete. Please try again.';
        displayArea.appendChild(errorMessage);
      }
    });
  }
  
  
