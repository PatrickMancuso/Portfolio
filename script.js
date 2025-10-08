// Smooth modal handling and nav highlighting
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");

  // Remove 'active' from all links and add to clicked one
  const setActiveLink = (clicked) => {
    navLinks.forEach(link => link.classList.remove("active"));
    clicked.classList.add("active");
  };

  // Open modal
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        setActiveLink(link);
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // prevent background scroll
        setTimeout(() => modal.classList.add("visible"), 10); // fade-in
      }
    });
  });

  // Close modal when 'X' clicked
  closes.forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });

  // Close modal if clicking outside
  window.addEventListener("click", e => {
    modals.forEach(modal => {
      if (e.target === modal) closeAllModals();
    });
  });

  // Escape key closes modals
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAllModals();
  });

  // Function to close all modals
  function closeAllModals() {
    modals.forEach(modal => {
      modal.classList.remove("visible");
      setTimeout(() => (modal.style.display = "none"), 300); // fade-out
    });
    document.body.style.overflow = "auto";
    navLinks.forEach(link => link.classList.remove("active"));
  }

  // Smooth scroll for same-page anchors (optional)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});

// Clickable project thumbnails and images (lightbox effect)
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  document.body.appendChild(lightbox);

  const images = document.querySelectorAll(".project-thumb, .project-image");
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
      lightbox.classList.add("show");
    });
  });

  lightbox.addEventListener("click", e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("show");
  });
});

