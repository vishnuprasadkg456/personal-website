document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gform');
    const submitButton = document.getElementById('submitButton');
    const popupMessage = document.getElementById('popupMessage');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || subject === '' || message === '') {
            showPopup('Error', 'Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showPopup('Error', 'Please enter a valid email address.');
            return;
        }

        // If validation passes, submit the form
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showPopup('Success', 'Your message has been sent successfully!');
            form.reset();
        })
        .catch(error => {
            showPopup('Error', 'There was a problem sending your message. Please try again later.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fa fa-paper-plane"></i> SEND MESSAGE';
        });
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showPopup(title, message) {
        popupTitle.textContent = title;
        popupContent.textContent = message;
        popupMessage.style.display = 'block';
    }
});
