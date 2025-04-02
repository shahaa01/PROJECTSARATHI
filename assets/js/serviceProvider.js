// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Intro animation
    setTimeout(() => {
        document.querySelector('.intro-container').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.intro-container').style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Add scroll animations
        animateOnScroll();
    });

    // Hours slider value display
    const hoursSlider = document.getElementById('hours-weekly');
    const hoursValue = document.getElementById('hours-value');
    
    if (hoursSlider && hoursValue) {
        hoursSlider.addEventListener('input', function() {
            hoursValue.textContent = this.value;
            updateIncomeEstimate();
        });
    }

    // Income calculator functionality
    const incomeForm = document.getElementById('income-calculator');
    const serviceTypeSelect = document.getElementById('service-type');
    const areaSelect = document.getElementById('area');
    
    if (incomeForm) {
        incomeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateIncomeEstimate();
        });
    }

    // Initial income estimate calculation
    updateIncomeEstimate();

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                this.classList.add('active');
            }
        });
    });

    // Apply form submission
    const applyForm = document.querySelector('.apply-form');
    
    if (applyForm) {
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (this would be replaced with actual form submission in production)
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            alert(`Thank you for applying to become a Sarathi Service Provider! We'll review your application and contact you soon.`);
            
            // Reset form
            this.reset();
        });
    }

    // Initialize scroll animations
    initScrollAnimations();
});

// Function to update income estimate based on inputs
function updateIncomeEstimate() {
    const hours = document.getElementById('hours-weekly')?.value || 20;
    const serviceType = document.getElementById('service-type')?.value || 'electrician';
    const area = document.getElementById('area')?.value || 'tinkune';
    
    // Hourly rates by service type (in Nepalese Rupees)
    const hourlyRates = {
        'plumber': 500,
        'electrician': 550,
        'tailor': 400,
        'painter': 450,
        'maid': 300,
        'cook': 350,
        'driver': 400,
        'gardener': 350,
        'tutor': 600,
        'beautician': 500,
        'waiter': 300
    };
    
    // Location multipliers
    const locationMultipliers = {
        'tinkune': 1.1,
        'baluwatar': 1.2,
        'baneshwor': 1.1,
        'chabahil': 1.0,
        'thamel': 1.3,
        'naxal': 1.2,
        'koteshwor': 1.0,
        'maharajgunj': 1.15,
        'kalanki': 0.95,
        'other': 1.0
    };
    
    // Calculate income
    let hourlyRate = hourlyRates[serviceType] || 400;
    let multiplier = locationMultipliers[area] || 1.0;
    
    let weeklyIncome = Math.round(hours * hourlyRate * multiplier);
    let monthlyIncome = weeklyIncome * 4;
    
    // Format with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    // Update the display
    if (document.getElementById('weekly-income')) {
        document.getElementById('weekly-income').textContent = formatNumber(weeklyIncome);
    }
    
    if (document.getElementById('monthly-income')) {
        document.getElementById('monthly-income').textContent = formatNumber(monthlyIncome);
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add js-scroll class to elements that should animate on scroll
    document.querySelectorAll('.step, .testimonial, .faq-item, .benefit-card').forEach(el => {
        el.classList.add('js-scroll');
    });
    
    // Trigger initial check
    animateOnScroll();
}

// Animate elements when they come into view
function animateOnScroll() {
    const scrollElements = document.querySelectorAll('.js-scroll');
    
    scrollElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('scrolled');
        }
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}