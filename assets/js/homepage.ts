// Homepage specific TypeScript for Sarathi

document.addEventListener('DOMContentLoaded', () => {
    const width = window.innerWidth || document.documentElement.clientWidth;
  
    if (width <= 768) {
      const primarySlogan = document.querySelector('.primary-slogan') as HTMLElement | null;
      const secSlogan = document.querySelector('.secondary-slogan') as HTMLElement | null;
      if (primarySlogan) primarySlogan.innerText = 'Your Trusted Service Partner';
      if (secSlogan) secSlogan.innerText = 'Reliable Home Services at Your Doorstep in Kathmandu';
    }
  
    const tabButtons = document.querySelectorAll('.tab-btn') as NodeListOf<HTMLElement>;
    const serviceCards = document.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
  
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const category = this.getAttribute('data-category');
  
        serviceCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category')?.split(' ') || [];
  
          if (category === 'popular' || cardCategories.includes(category!)) {
            card.style.display = 'block';
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
  
    const bookingForm = document.querySelector('.booking-form') as HTMLFormElement | null;
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]') as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            let errorMsg = field.parentElement?.querySelector('.error-message') as HTMLElement | null;
            if (!errorMsg) {
              errorMsg = document.createElement('div');
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'This field is required';
              field.parentElement?.appendChild(errorMsg);
            }
          } else {
            field.classList.remove('error');
            const errorMsg = field.parentElement?.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
          }
        });
  
        if (isValid) {
          const successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Your booking has been submitted successfully! We will contact you shortly.';
  
          const existingMsg = bookingForm.querySelector('.success-message');
          if (existingMsg) existingMsg.remove();
  
          bookingForm.appendChild(successMsg);
          bookingForm.reset();
  
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
          setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => {
              successMsg.remove();
            }, 500);
          }, 5000);
        }
      });
  
      bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function () {
          this.classList.remove('error');
          const errorMsg = this.parentElement?.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        });
      });
    }
  
    const contactForm = document.querySelector('.contact-form form') as HTMLFormElement | null;
    if (contactForm) {
      contactForm.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]') as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });
  
        if (isValid) {
          alert('Your message has been sent successfully! We will get back to you soon.');
          this.reset();
        }
      });
    }
  
    const animateOnScroll = (): void => {
      const elements = document.querySelectorAll('.service-card, .step, .provider-card, .testimonial-card, .info-card') as NodeListOf<HTMLElement>;
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
          element.classList.add('animate');
        }
      });
    };
  
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  
    const heroSearchForm = document.querySelector('.search-container') as HTMLFormElement | null;
    if (heroSearchForm) {
      heroSearchForm.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        const searchInput = this.querySelector('input') as HTMLInputElement | null;
        if (searchInput?.value.trim()) {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          const searchTerm = searchInput.value.toLowerCase();
          const serviceCards = document.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
  
          serviceCards.forEach(card => {
            const serviceName = card.querySelector('h3')?.textContent?.toLowerCase() || '';
            const serviceDesc = card.querySelector('p')?.textContent?.toLowerCase() || '';
  
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
  
    const dateInput = document.getElementById('date') as HTMLInputElement | null;
    if (dateInput) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const currentDate = `${yyyy}-${mm}-${dd}`;
      dateInput.setAttribute('min', currentDate);
    }
  
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
        0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
        50% { box-shadow: 0 10px 30px rgba(255, 102, 0, 0.3); }
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
  
    const buttons = document.querySelectorAll('.glow') as NodeListOf<HTMLElement>;
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        btn.style.setProperty('--shine-x', `${x}px`);
        btn.style.setProperty('--shine-opacity', '1');
      });
  
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--shine-opacity', '0');
      });
    });
  });
  