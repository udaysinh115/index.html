

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initEventTabs();
  initScrollReveal();
  initCountUp();
});


function initNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}


function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = navLinks.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


function initEventTabs() {
  const tabs = document.querySelectorAll('.events-tab');
  const panels = document.querySelectorAll('.events-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      
      tabs.forEach(t => t.classList.remove('active'));
      
      panels.forEach(p => {
        p.style.display = 'none';
        p.style.opacity = '0';
      });

    
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) {
        target.style.display = 'grid';
        
        void target.offsetWidth;
        target.style.opacity = '1';
        target.style.transition = 'opacity 0.4s ease';
      }
    });
  });
}


function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


function initCountUp() {
  const stats = document.querySelectorAll('.hero-stat-value');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (!target) return;

        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 1500;
        const stepTime = duration / (target / increment);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString() + suffix;
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
