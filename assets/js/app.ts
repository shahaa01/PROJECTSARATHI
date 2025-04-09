// Enhanced TypeScript for Sarathi

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro-container') as HTMLElement | null;
  
    if (intro) {
      setTimeout(() => {
        intro.style.opacity = '0';
        intro.style.transition = 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
  
        setTimeout(() => {
          intro.classList.add('hide');
          animateHeroContent();
        }, 800);
      }, 1500);
    } else {
      animateHeroContent();
    }
  
    const mobileMenuToggle = document.getElementById('mobile-menu') as HTMLElement | null;
    const navLinks = document.getElementById('nav-links') as HTMLElement | null;
  
    if (mobileMenuToggle && navLinks) {
      const updateMenuVisibility = (): void => {
        if (window.innerWidth <= 950) {
          navLinks.classList.remove('active');
        } else {
          navLinks.classList.remove('hide');
        }
      };
  
      mobileMenuToggle.addEventListener('click', function () {
        if (window.innerWidth <= 950) {
          navLinks.classList.toggle('active');
          const bars = this.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
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
  
      window.addEventListener('resize', updateMenuVisibility);
      updateMenuVisibility();
    }
  
    const header = document.querySelector('header') as HTMLElement | null;
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e: Event) {
        e.preventDefault();
        const targetId = (this as HTMLAnchorElement).getAttribute('href');
        if (targetId === '#') return;
  
        const targetElement = document.querySelector(targetId!) as HTMLElement | null;
        if (targetElement) {
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
              mobileMenuToggle.classList.remove('active');
              const bars = mobileMenuToggle.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
              bars[0].style.transform = 'none';
              bars[1].style.opacity = '1';
              bars[2].style.transform = 'none';
            }
          }
  
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });
  
  function animateHeroContent(): void {
    const hero = document.querySelector('.hero') as HTMLElement | null;
    if (hero) {
      const heroElements = hero.querySelectorAll('h2, input, button') as NodeListOf<HTMLElement>;
      heroElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 200 * index);
      });
    }
  }
  
  function animateServiceItems(): void {
    const serviceImages: Record<string, string> = {
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
  
    const serviceItems = document.querySelectorAll('.service-item') as NodeListOf<HTMLElement>;
  
    serviceItems.forEach(item => {
      const serviceName = item.textContent?.trim() || '';
      const imageContainer = document.createElement('div');
      imageContainer.className = 'service-image-container';
  
      if (serviceImages[serviceName]) {
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        item.style.zIndex = '1';
  
        const img = document.createElement('img');
        img.src = serviceImages[serviceName];
        img.alt = serviceName;
        img.className = 'service-image';
  
        const overlay = document.createElement('div');
        overlay.className = 'service-overlay';
  
        const textContainer = document.createElement('div');
        textContainer.className = 'service-text';
        textContainer.textContent = serviceName;
  
        const originalText = item.textContent;
        item.textContent = '';
  
        imageContainer.appendChild(img);
        item.appendChild(imageContainer);
        item.appendChild(overlay);
        item.appendChild(textContainer);
  
        item.classList.add('loading');
  
        img.onload = () => {
          item.classList.remove('loading');
          item.classList.add('loaded');
        };
  
        img.onerror = () => {
          item.classList.remove('loading');
          item.style.backgroundImage = 'none';
          textContainer.textContent = originalText;
        };
      }
  
      item.addEventListener('mouseenter', function () {
        this.classList.add('hover');
      });
  
      item.addEventListener('mouseleave', function () {
        this.classList.remove('hover');
      });
  
      item.addEventListener('click', function () {
        const selectedName = this.querySelector('.service-text')?.textContent || this.textContent;
        const input = document.querySelector('#booking form input[placeholder="Service Needed"]') as HTMLInputElement | null;
        if (input) {
          input.value = selectedName || '';
          document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  
    setupBookingForm();
    setupSearchFunctionality();
  }
  
  function setupBookingForm(): void {
    const bookingForm = document.querySelector('#booking form') as HTMLFormElement | null;
    if (!bookingForm) return;
  
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const formInputs = this.querySelectorAll('input[required]') as NodeListOf<HTMLInputElement>;
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
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Booking successful! We will contact you soon.';
  
        const existingMessage = bookingForm.querySelector('.success-message');
        if (existingMessage) {
          existingMessage.remove();
        }
  
        bookingForm.appendChild(successMessage);
        bookingForm.reset();
  
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
            successMessage.remove();
          }, 600);
        }, 5000);
      }
    });
  
    bookingForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', function () {
        (this as HTMLInputElement).classList.remove('error');
      });
    });
  }
  
  function setupSearchFunctionality(): void {
    const searchInput = document.querySelector('.hero input[type="text"]') as HTMLInputElement | null;
    const searchButton = document.querySelector('.hero button') as HTMLButtonElement | null;
    const serviceItems = document.querySelectorAll('.service-item') as NodeListOf<HTMLElement>;
  
    if (!searchInput || !searchButton) return;
  
    function performSearch(): void {
      const searchTerm = searchInput!.value.trim().toLowerCase();
  
      if (searchTerm) {
        serviceItems.forEach(item => {
          const name = (item.querySelector('.service-text')?.textContent || item.textContent || '').toLowerCase();
  
          if (name.includes(searchTerm)) {
            item.style.display = 'flex';
            item.classList.add('highlight');
            setTimeout(() => {
              item.classList.remove('highlight');
            }, 2000);
          } else {
            item.style.display = 'none';
          }
        });
  
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        serviceItems.forEach(item => {
          item.style.display = 'flex';
        });
      }
    }
  
    searchInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  
    searchButton.addEventListener('click', () => {
      performSearch();
    });
  
    const serviceLink = document.querySelector('a[href="#services"]');
    serviceLink?.addEventListener('click', () => {
      searchInput.value = '';
      serviceItems.forEach(item => {
        item.style.display = 'flex';
      });
    });
  }
  
    
  function setupDateValidation(): void {
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement | null;
    if (!dateInput) return;
  
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;
  
    dateInput.setAttribute('min', currentDate);
  
    dateInput.addEventListener('change', function () {
      const selectedDate = new Date(this.value);
      const current = new Date();
      current.setHours(0, 0, 0, 0);
  
      if (selectedDate < current) {
        this.value = '';
        alert('Please select a future date for booking.');
      }
    });
  }
  
  function setupProviderLink(): void {
    const navLinks = document.querySelector('#nav-links') as HTMLElement | null;
    if (navLinks) {
      const providerLink = document.createElement('li');
      providerLink.innerHTML = '';
      navLinks.appendChild(providerLink);
    }
  
    const providerButton = document.getElementById('become-provider');
    providerButton?.addEventListener('click', function (e: Event) {
      e.preventDefault();
      // Implement modal logic here if needed
    });
  
    console.log('Please ensure you have created the following directory structure for service images:');
    console.log('assets/images/services/');
    console.log('With image files named: plumber.jpg, carpenter.jpg, electrician.jpg, etc.');
  }
  
  // Initialize extra functionality
  setupDateValidation();
  setupProviderLink();
  