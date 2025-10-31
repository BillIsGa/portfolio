// Animate each section when it enters view
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".panel");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  panels.forEach((panel) => observer.observe(panel));
});
