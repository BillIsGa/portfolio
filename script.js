// Horizontal scroll navigation using vertical scroll wheel
const container = document.querySelector('.scroll-container');
const panels = document.querySelectorAll('.panel');

let currentIndex = 0;
let isScrolling = false;

function showPanel(index) {
  container.style.transform = `translateX(-${index * 100}vw)`;
  panels.forEach((p, i) => p.classList.toggle('active', i === index));
}

// Handle mouse wheel and touch
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentIndex < panels.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  showPanel(currentIndex);
  setTimeout(() => (isScrolling = false), 1000);
});

// Handle navbar links
document.querySelectorAll('.nav-links a').forEach((link, i) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = i;
    showPanel(currentIndex);
  });
});

// Initialize first panel
showPanel(0);
