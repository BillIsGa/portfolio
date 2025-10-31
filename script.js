// Smooth scroll animation on load
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero .subtitle');
  
  setTimeout(() => {
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
    heroTitle.style.transition = 'all 1s ease';
  }, 300);
  
  setTimeout(() => {
    heroSubtitle.style.opacity = '1';
    heroSubtitle.style.transform = 'translateY(0)';
    heroSubtitle.style.transition = 'all 1s ease';
  }, 600);
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 1s ease';
    }
  });
}, observerOptions);

document.querySelectorAll('.section-content').forEach(el => {
  observer.observe(el);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Parallax effect for hero gradient
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const gradient = document.querySelector('.hero-gradient');
      if (gradient && scrolled < window.innerHeight) {
        gradient.style.transform = `translateY(${scrolled * 0.5}px)`;
        gradient.style.opacity = 1 - (scrolled / window.innerHeight);
      }
      ticking = false;
    });
    ticking = true;
  }
});
