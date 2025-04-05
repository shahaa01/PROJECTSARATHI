// Homepage specific JavaScript for Sarathi

document.addEventListener('DOMContentLoaded', function() {
    // Service category tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to filter
            const category = this.getAttribute('data-category');
            
            // Filter service cards
            serviceCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (category === 'popular' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    // Add a slight delay for a staggered animation effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Booking form validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentElement.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            // If form is valid, show success message
            if (isValid) {
                // Create success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Your booking has been submitted successfully! We will contact you shortly.';
                
                // Remove any existing success message
                const existingMsg = bookingForm.querySelector('.success-message');
                if (existingMsg) {
                    existingMsg.remove();
                }
                
                // Add success message to form
                bookingForm.appendChild(successMsg);
                
                // Reset form
                bookingForm.reset();
                
                // Scroll to success message
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 500);
                }, 5000);
            }
        });
        
        // Remove error styling on input
        bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Similar validation as booking form
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Your message has been sent successfully! We will get back to you soon.');
                this.reset();
            }
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .step, .provider-card, .testimonial-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();
    
    // Hero search functionality
    const heroSearchForm = document.querySelector('.search-container');
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input');
            const locationSelect = this.querySelector('select');
            
            if (searchInput.value.trim()) {
                // Scroll to services section
                document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
                
                // Highlight matching services (in a real app, this would filter results)
                const searchTerm = searchInput.value.toLowerCase();
                const serviceCards = document.querySelectorAll('.service-card');
                
                serviceCards.forEach(card => {
                    const serviceName = card.querySelector('h3').textContent.toLowerCase();
                    const serviceDesc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (serviceName.includes(searchTerm) || serviceDesc.includes(searchTerm)) {
                        card.classList.add('highlight');
                        setTimeout(() => {
                            card.classList.remove('highlight');
                        }, 2000);
                    }
                });
            }
        });
    }
    
    // Date input validation - prevent past dates
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        
        const currentDate = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', currentDate);
    }
    
    // Add CSS styles for animations and form validation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .step, .provider-card, .testimonial-card, .info-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .highlight {
            animation: highlight 2s ease;
        }
        
        @keyframes highlight {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            }
            50% {
                box-shadow: 0 10px 30px rgba(255, 102, 0, 0.3);
            }
        }
        
        .error {
            border-color: var(--error) !important;
        }
        
        .error-message {
            color: var(--error);
            font-size: 12px;
            margin-top: 5px;
        }
        
        .success-message {
            background: var(--success);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            transition: opacity 0.5s ease;
        }
        
        .success-message i {
            margin-right: 10px;
            font-size: 20px;
        }
    `;
    
    document.head.appendChild(style);
});


const buttons = document.querySelectorAll('.glow'); // Select all buttons with .glow class

buttons.forEach(btn => {
  // Add event listener for mouse movement
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();  // Get the button's position
    const x = e.clientX - rect.left;  // Get the X position of the mouse within the button

    // Update the custom properties for shine effect
    btn.style.setProperty('--shine-x', `${x}px`);
    btn.style.setProperty('--shine-opacity', '1');
  });

  // Reset shine effect opacity when mouse leaves
  btn.addEventListener('mouseleave', () => {
    btn.style.setProperty('--shine-opacity', '0');
  });
});


