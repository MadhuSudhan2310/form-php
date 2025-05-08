document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('success-message');

    // Form validation
    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validate name (at least 2 characters)
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter a valid name (at least 2 characters)';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Validate email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validate phone (if provided)
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        if (phoneInput.value && !/^[\d\s\-()+]{10,}$/.test(phoneInput.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        // Validate agreement checkbox
        const agreeInput = document.getElementById('agree');
        const agreeError = document.getElementById('agree-error');
        if (!agreeInput.checked) {
            agreeError.textContent = 'You must agree to the terms and conditions';
            agreeError.style.display = 'block';
            isValid = false;
        } else {
            agreeError.style.display = 'none';
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    // If the URL has a success parameter, show success message
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        successMessage.textContent = 'Form submitted successfully!';
        successMessage.style.display = 'block';
        
        // Clear the form
        form.reset();
        
        // Scroll to the success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
});