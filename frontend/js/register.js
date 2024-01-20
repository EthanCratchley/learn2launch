document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
  
    fetch('http://127.0.0.1:5001/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })

    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/signin.html'; // Redirect to the sign-in page on success
      } else {
        alert(data.message); // Show error message from server
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  