gsap.registerPlugin(ScrollTrigger);

// Fade-in content for animated sections
document.querySelectorAll(".panel.animated, .panel.sticky").forEach(panel => {
  const content = panel.querySelector(".content, .sticky-inner");
  if(content){
    gsap.fromTo(content,
      {opacity:0, y:50},
      {opacity:1, y:0, duration:1.2,
       scrollTrigger:{trigger:panel, start:"top 70%", toggleActions:"play none none reverse"}});
  }
});

// Sticky pinning for sticky sections
document.querySelectorAll(".panel.sticky").forEach(panel => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    end: "+=150%",
    pin: true,
    pinSpacing: true,
    scrub: true
  });
});

// Smooth navbar scroll
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    window.scrollTo({top: target.offsetTop - 50, behavior:'smooth'});
  });
});

// Learn More buttons
document.querySelectorAll('.learn-more, .cta').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    if(target) window.location.href = `${target}.html`;
  });
});
