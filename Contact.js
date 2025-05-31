
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusMessage = form.querySelector('.form-status');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusMessage.textContent = '';
      
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        statusMessage.textContent = 'Please fill in all fields.';
        statusMessage.style.color = 'red';
        return;
      }
      if (!emailRegex.test(email)) {
        statusMessage.textContent = 'Please enter a valid email address.';
        statusMessage.style.color = 'red';
        return;
      }

      // Prepare form data for submission
      const formData = new FormData(form);

      try {
        statusMessage.textContent = 'Sending...';
        statusMessage.style.color = '#2563eb';

        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          statusMessage.textContent = 'Thank you! Your message has been sent.';
          statusMessage.style.color = 'green';
          form.reset();
        } else {
          const data = await response.json();
          if (data?.errors) {
            statusMessage.textContent = data.errors.map(err => err.message).join(', ');
          } else {
            statusMessage.textContent = 'Oops! Something went wrong. Please try again later.';
          }
          statusMessage.style.color = 'red';
        }
      } catch (error) {
        statusMessage.textContent = 'Network error. Please check your connection and try again.';
        statusMessage.style.color = 'red';
      }
    });
  });

  