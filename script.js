gsap.registerPlugin(ScrollTrigger);

// Animate each section as it scrolls into view
gsap.utils.toArray(".panel").forEach((panel) => {
  const content = panel.querySelector(".content");
  const image = panel.querySelector(".image");

  gsap.fromTo(content,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 1.2,
      scrollTrigger: {
        trigger: panel,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

  if (image) {
    gsap.fromTo(image,
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1, scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: panel,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      });
  }
});

// Smooth scroll to sections
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 50,
      behavior: 'smooth'
    });
  });
});

// Learn More buttons (placeholder logic)
document.querySelectorAll('.learn-more').forEach(button => {
  button.addEventListener('click', () => {
    const page = button.dataset.target;
    window.location.href = `${page}.html`; // e.g., about.html, translation.html
  });
});
