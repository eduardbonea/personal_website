document.getElementById('main-contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
       
        const response = await fetch('http://localhost:3004/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Mesaj trimis cu succes!');
            document.getElementById('main-contact-form').reset(); 
        } else {
            alert('Eroare: ' + result.msg);
        }
    } catch (error) {
        console.error('Eroare la trimitere:', error);
        alert('Nu s-a putut contacta serverul.');
    }
});