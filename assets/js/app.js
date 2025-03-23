// Enhanced JS for Sarathi

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Intro animation
    const intro = document.querySelector('.intro-container');
    
    if (intro) {
        // Add a slight delay before starting the fade out
        setTimeout(() => {
            // Add fade-out animation
            intro.style.opacity = '0';
            intro.style.transition = 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            
            // Remove the intro container after animation completes
            setTimeout(() => {
                intro.classList.add('hide');
                // Trigger entrance animations for hero content
                animateHeroContent();
            }, 800);
        }, 1500);
    } else {
        // If intro is not present, animate hero content immediately
        animateHeroContent();
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuToggle && navLinks) {
        // Initialize mobile menu state based on screen width
        function updateMenuVisibility() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            } else {
                navLinks.classList.remove('hide');
            }
        }
        
        // Toggle mobile menu on click
        mobileMenuToggle.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.toggle('active');
                
                // Animate hamburger to X
                const bars = this.querySelectorAll('.bar');
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
        
        // Update menu on window resize
        window.addEventListener('resize', updateMenuVisibility);
        
        // Initial check
        updateMenuVisibility();
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                        mobileMenuToggle.classList.remove('active');
                        const bars = mobileMenuToggle.querySelectorAll('.bar');
                        bars[0].style.transform = 'none';
                        bars[1].style.opacity = '1';
                        bars[2].style.transform = 'none';
                    }
                }
                
                // Scroll smoothly to the target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Define animateHeroContent function
    function animateHeroContent() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // Animate hero elements
            const heroElements = hero.querySelectorAll('h2, input, button');
            heroElements.forEach((element, index) => {
                // Stagger the animations
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 * index);
            });
        }
    }
    
    // Service images mapping
    const serviceImages = {
        'Plumber': 'assets/images/services/plumber.jpg',
        'Carpenter': 'assets/images/services/carpenter.jpg',
        'Electrician': 'assets/images/services/electrician.jpg',
        'Tailor': 'assets/images/services/tailor.jpg',
        'Painter': 'assets/images/services/painter.jpg',
        'Maid': 'assets/images/services/maid.jpg',
        'Cook': 'assets/images/services/cook.jpg',
        'Driver': 'assets/images/services/driver.jpg',
        'Gardener': 'assets/images/services/gardener.jpg',
        'Tutor': 'assets/images/services/tutor.jpg',
        'Beautician': 'assets/images/services/beautician.jpg',
        'Waiter': 'assets/images/services/waiter.jpg'
    };
    
    // Add background images to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const serviceName = item.textContent.trim();
        
        // Create image element and overlay container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'service-image-container';
        
        // Add image background
        if (serviceImages[serviceName]) {
            // Create a placeholder for the image until it loads
            item.style.position = 'relative';
            item.style.overflow = 'hidden';
            item.style.zIndex = '1';
            
            // Create image element
            const img = document.createElement('img');
            img.src = serviceImages[serviceName];
            img.alt = serviceName;
            img.className = 'service-image';
            
            // Create overlay for better text readability
            const overlay = document.createElement('div');
            overlay.className = 'service-overlay';
            
            // Create text container to ensure it stays on top
            const textContainer = document.createElement('div');
            textContainer.className = 'service-text';
            textContainer.textContent = serviceName;
            
            // Empty the original text content
            const originalText = item.textContent;
            item.textContent = '';
            
            // Add all elements
            imageContainer.appendChild(img);
            item.appendChild(imageContainer);
            item.appendChild(overlay);
            item.appendChild(textContainer);
            
            // Add loading state and handle image load
            item.classList.add('loading');
            img.onload = function() {
                item.classList.remove('loading');
                item.classList.add('loaded');
            };
            
            // Add fallback in case image fails to load
            img.onerror = function() {
                item.classList.remove('loading');
                item.style.backgroundImage = 'none';
                textContainer.textContent = originalText;
            };
        }
        
        // Service item hover effects
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Make service items clickable
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-text')?.textContent || this.textContent;
            const serviceInput = document.querySelector('#booking form input[placeholder="Service Needed"]');
            if (serviceInput) {
                serviceInput.value = serviceName;
                // Scroll to booking section
                document.querySelector('#booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Add CSS styles for service images
    const style = document.createElement('style');
    style.textContent = `
        .service-item {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .service-image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
        
        .service-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .service-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 0;
            transition: background-color 0.3s ease;
        }
        
        .service-text {
            position: relative;
            z-index: 2;
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
            font-size: 1.2rem;
        }
        
        .service-item.hover .service-image {
            transform: scale(1.1);
        }
        
        .service-item.hover .service-overlay {
            background: rgba(0, 0, 0, 0.2);
        }
        
        .service-item.hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .service-item.loading::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            z-index: -1;
        }
        
        @keyframes loading {
            0% {
                background-position: 0% 50%;
            }
            100% {
                background-position: 200% 50%;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Form validation and submission
    const bookingForm = document.querySelector('#booking form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formInputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Booking successful! We will contact you soon.';
                
                // Remove any existing success message
                const existingMessage = bookingForm.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                bookingForm.appendChild(successMessage);
                
                // Clear form
                bookingForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 600);
                }, 5000);
            }
        });
        
        // Remove error class on input
        bookingForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.hero input[type="text"]');
    const searchButton = document.querySelector('.hero button');
    
    if (searchInput && searchButton) {
        // Search on enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Search on button click
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Filter service items based on search term
                serviceItems.forEach(item => {
                    const serviceName = (item.querySelector('.service-text')?.textContent || item.textContent).toLowerCase();
                    
                    if (serviceName.includes(searchTerm)) {
                        item.style.display = 'flex';
                        item.classList.add('highlight');
                        setTimeout(() => {
                            item.classList.remove('highlight');
                        }, 2000);
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Scroll to services section
                document.querySelector('#services').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                // If empty search, show all services
                serviceItems.forEach(item => {
                    item.style.display = 'flex';
                });
            }
        }
        
        // Reset search when clicking on service nav link
        document.querySelector('a[href="#services"]').addEventListener('click', function() {
            searchInput.value = '';
            serviceItems.forEach(item => {
                item.style.display = 'flex';
            });
        });
    }
    
    // Date validation - prevent past dates
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        // Set min date to today
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const currentDate = `${yyyy}-${mm}-${dd}`;
        
        dateInput.setAttribute('min', currentDate);
        
        // Validate date on change
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const currentDate = new Date();
            
            // Reset time portion for accurate comparison
            currentDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < currentDate) {
                this.value = '';
                alert('Please select a future date for booking.');
            }
        });
    }
    
    // Add service provider capability
    const providerLink = document.createElement('li');
    providerLink.innerHTML = '<a href="#" id="become-provider">Become a Provider</a>';
    document.querySelector('#nav-links').appendChild(providerLink);
    
    // Provider registration modal
    document.getElementById('become-provider')?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create modal if it doesn't exist
        if (!document.querySelector('.provider-modal')) {
            const modal = document.createElement('div');
            modal.className = 'provider-modal';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Become a Service Provider</h2>
                    <form id="provider-form">
                        <input type="text" placeholder="Full Name" required>
                        <input type="email" placeholder="Email Address" required>
                        <input type="tel" placeholder="Phone Number" required>
                        <select required>
                            <option value="">Select Service Type</option>
                            <option value="plumber">Plumber</option>
                            <option value="carpenter">Carpenter</option>
                            <option value="electrician">Electrician</option>
                            <option value="tailor">Tailor</option>
                            <option value="painter">Painter</option>
                            <option value="maid">Maid</option>
                            <option value="cook">Cook</option>
                            <option value="driver">Driver</option>
                            <option value="gardener">Gardener</option>
                            <option value="tutor">Tutor</option>
                            <option value="beautician">Beautician</option>
                            <option value="waiter">Waiter</option>
                            <option value="other">Other</option>
                        </select>
                        <input type="text" placeholder="Years of Experience" required>
                        <textarea placeholder="Brief description of your skills and experience" required></textarea>
                        <button type="submit">Register as Provider</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            document.querySelector('.close-modal').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Handle provider form submission
            document.getElementById('provider-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                const formContent = this.innerHTML;
                this.innerHTML = '<div class="success-message">Thank you for registering! Our team will review your application and contact you soon.</div>';
                
                // Reset form after 5 seconds and close modal
                setTimeout(() => {
                    this.innerHTML = formContent;
                    modal.style.display = 'none';
                }, 5000);
            });
        } else {
            // Show existing modal
            document.querySelector('.provider-modal').style.display = 'block';
        }
    });
    
    // Create directory structure notice in console
    console.log('Please ensure you have created the following directory structure for service images:');
    console.log('assets/images/services/');
    console.log('With image files named: plumber.jpg, carpenter.jpg, electrician.jpg, etc.');
});