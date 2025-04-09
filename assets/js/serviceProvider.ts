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

    // ✅ Exit early if they are not found
    if (!mobileMenuToggle || !navLinks) return;
    
  if (mobileMenuToggle && navLinks) {
    function updateMenuVisibility(): void {
      if (!navLinks || !mobileMenuToggle) return;
      
      if (window.innerWidth > 950) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const bars = mobileMenuToggle.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
        if (bars.length > 0) {
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      }
    }

    function toggleMenu(e?: Event): void {
      if (!navLinks || !mobileMenuToggle) return;
      
      e?.preventDefault();
      e?.stopPropagation();

      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      const bars = mobileMenuToggle.querySelectorAll('.bar') as NodeListOf<HTMLElement>;

      if (mobileMenuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);
    mobileMenuToggle.addEventListener('touchstart', toggleMenu, { passive: false });

    const closeMenu = (e: Event): void => {
      const target = e.target as Node;
      if (navLinks.classList.contains('active') &&
          !navLinks.contains(target) &&
          !mobileMenuToggle.contains(target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const bars = mobileMenuToggle.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    };

    document.addEventListener('click', closeMenu);
    document.addEventListener('touchstart', closeMenu, { passive: true });

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
      animateOnScroll();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e: Event) {
      e.preventDefault();
      const targetId = (this as HTMLAnchorElement).getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId!) as HTMLElement | null;

      if (targetElement) {
        if (navLinks?.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (mobileMenuToggle?.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            const bars = mobileMenuToggle.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
          }
        }
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  const hoursSlider = document.getElementById('hours-weekly') as HTMLInputElement | null;
  const hoursValue = document.getElementById('hours-value') as HTMLElement | null;

  if (hoursSlider && hoursValue) {
    hoursSlider.addEventListener('input', function () {
      hoursValue.textContent = hoursSlider.value;
      updateIncomeEstimate();
    });
  }

  const incomeForm = document.getElementById('income-calculator') as HTMLFormElement | null;
  if (incomeForm) {
    incomeForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      updateIncomeEstimate();
    });
  }

  updateIncomeEstimate();

  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement as HTMLElement;
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question')?.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
        this.classList.add('active');
      }
    });
  });

  const applyForm = document.querySelector('.apply-form') as HTMLFormElement | null;
  if (applyForm) {
    applyForm.addEventListener('submit', function (e: Event) {
      e.preventDefault();
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      alert(`Thank you for applying to become a Sarathi Service Provider! We'll review your application and contact you soon.`);
      this.reset();
    });
  }

  initScrollAnimations();
});

function updateIncomeEstimate(): void {
  const hours = parseFloat((document.getElementById('hours-weekly') as HTMLInputElement | null)?.value || '20');
  const serviceType = (document.getElementById('service-type') as HTMLSelectElement | null)?.value || 'electrician';
  const area = (document.getElementById('area') as HTMLSelectElement | null)?.value || 'tinkune';

  const hourlyRates: Record<string, number> = {
    plumber: 500,
    electrician: 550,
    tailor: 400,
    painter: 450,
    maid: 300,
    cook: 350,
    driver: 400,
    gardener: 350,
    tutor: 600,
    beautician: 500,
    waiter: 300
  };

  const locationMultipliers: Record<string, number> = {
    tinkune: 1.1,
    baluwatar: 1.2,
    baneshwor: 1.1,
    chabahil: 1.0,
    thamel: 1.3,
    naxal: 1.2,
    koteshwor: 1.0,
    maharajgunj: 1.15,
    kalanki: 0.95,
    other: 1.0
  };

  const hourlyRate = hourlyRates[serviceType] || 400;
  const multiplier = locationMultipliers[area] || 1.0;

  const weeklyIncome = Math.round(hours * hourlyRate * multiplier);
  const monthlyIncome = weeklyIncome * 4;

  const formatNumber = (num: number): string => num.toLocaleString();

  const weeklyElem = document.getElementById('weekly-income');
  const monthlyElem = document.getElementById('monthly-income');

  if (weeklyElem) weeklyElem.textContent = formatNumber(weeklyIncome);
  if (monthlyElem) monthlyElem.textContent = formatNumber(monthlyIncome);
}

function initScrollAnimations(): void {
  document.querySelectorAll('.step, .testimonial, .faq-item, .benefit-card').forEach(el => {
    el.classList.add('js-scroll');
  });
  animateOnScroll();
}

function animateOnScroll(): void {
  const scrollElements = document.querySelectorAll('.js-scroll') as NodeListOf<HTMLElement>;
  scrollElements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('scrolled');
    }
  });
}

function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}