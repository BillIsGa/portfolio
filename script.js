// Scroll-based fade-in
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => observer.observe(el));

// Modal functionality
const modals = document.querySelectorAll('.modal');
const openButtons = document.querySelectorAll('.learn-btn');
const closeButtons = document.querySelectorAll('.close');

openButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.parentElement.parentElement.style.display = 'none';
  });
});

window.onclick = e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
};
