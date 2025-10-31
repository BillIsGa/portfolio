document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".panel");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(sec => observer.observe(sec));
});
