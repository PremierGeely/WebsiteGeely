document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Floating menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const floatingMenu = document.querySelector('.floating-menu');

    menuToggle.addEventListener('click', () => {
        floatingMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinksList = document.querySelectorAll('.sticky-nav ul li a');

    navLinksList.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetClass = this.getAttribute('href').substring(1);
            const targetElement = document.querySelector('.' + targetClass);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust for sticky nav height
                    behavior: 'smooth'
                });

                // Close the hamburger menu if it's open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});

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

  const slideTrack = document.querySelector('.slide-track');
let scrollAmount = 0;
const slideWidth = document.querySelector('.slide').offsetWidth;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        scrollAmount = Math.min(scrollAmount + slideWidth, slideTrack.scrollWidth - slideTrack.clientWidth);
        slideTrack.style.transform = `translateX(-${scrollAmount}px)`;
    }
    if (e.key === 'ArrowLeft') {
        scrollAmount = Math.max(scrollAmount - slideWidth, 0);
        slideTrack.style.transform = `translateX(-${scrollAmount}px)`;
    }
});
