const observerOptions = {
  threshold: 0.2,
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});
