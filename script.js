// Highlight active nav link
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll for same-page links (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

