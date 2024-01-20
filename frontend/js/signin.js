document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const formData = { email, password };

    fetch('http://127.0.0.1:5001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            // Use the message from the server or a default one
            const errorMessage = data.message || 'An error occurred';
            throw new Error(errorMessage);
        }
        return data; // If successful, proceed with the response data
    })
    .then(data => {
        // Handle the successful response here, e.g., redirect to a user dashboard
        alert(data.message); // Display the success message from server
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message); // Display the failure message
    });
});
