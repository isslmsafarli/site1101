document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');

  const applyTheme = (mode) => {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-sun', !isDark);
        icon.classList.toggle('fa-moon', isDark);
      }
    }
  };

  // Initialize theme from localStorage (default: light)
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = !document.body.classList.contains('dark-mode');
      applyTheme(isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Exit if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Scroll-based reveal for cards and sections
    const revealElements = document.querySelectorAll('.content-card, .hero-card');
    const staggerLists = document.querySelectorAll('.item-list, .blog-list');

    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));
    staggerLists.forEach(list => list.classList.add('reveal-stagger'));

    const observerOptions = {
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Reveal children with simple stagger
          if (entry.target.classList.contains('reveal-stagger')) {
            Array.from(entry.target.children).forEach((child, index) => {
              child.style.transitionDelay = `${index * 80}ms`;
              child.classList.add('is-visible');
            });
          }
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .reveal-stagger').forEach(el => {
      revealObserver.observe(el);
    });

    // Hero and profile subtle entrance
    const hero = document.querySelector('.hero-card');
    const profileImage = document.querySelector('.profile-image');

    if (hero) {
      hero.classList.add('is-visible');
    }
    if (profileImage) {
      profileImage.style.transform = 'scale(1)';
    }

    // Bottom nav slide-in
    const bottomNavCard = document.querySelector('.bottom-nav-card');
    if (bottomNavCard) {
      requestAnimationFrame(() => {
        bottomNavCard.style.transform = 'translateY(0)';
        bottomNavCard.style.opacity = '1';
      });
    }
  }
});


