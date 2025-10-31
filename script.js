// Fade body in when loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Section fade-in on scroll
const panels = document.querySelectorAll('.panel');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  },
  { threshold: 0.3 }
);

panels.forEach(panel => observer.observe(panel));
