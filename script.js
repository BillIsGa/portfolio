// Fade-in effect when scrolling to a new section
const panels = document.querySelectorAll('.panel');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.3 } // 30% visible = trigger animation
);

panels.forEach(panel => observer.observe(panel));
