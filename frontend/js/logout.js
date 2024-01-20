// Ensure this script is only included on pages where logout should be possible
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();

    fetch('/api/auth/logout', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed.');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            window.location.href = '/signin'; // Adjust this as necessary
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
