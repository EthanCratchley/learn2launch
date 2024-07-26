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
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = 'http://127.0.0.1:5001/userhome';
        } else {
            alert(data.message || 'Login failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
});
