// In logout.js
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();

    fetch('/api/auth/logout', {
        method: 'GET'
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Redirect to sign-in page or show a message
        }
        throw new Error('Logout failed.');
    })
    .then(data => {
        alert(data.message);
        window.location.href = '/signin'; // Redirect to the sign-in page
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
