// Animate sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".panel");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );
  panels.forEach(panel => observer.observe(panel));

  // Learn More buttons toggle expanded content
  const buttons = document.querySelectorAll(".learn-more");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.section + "-expanded";
      const content = document.getElementById(id);
      content.style.display = (content.style.display === "block") ? "none" : "block";
    });
  });
});
