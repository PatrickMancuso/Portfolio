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

// Lightbox for main page project thumbnails only
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  document.body.appendChild(lightbox);

  const thumbs = document.querySelectorAll(".project-thumb");
  thumbs.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.innerHTML = `
        <div class="lightbox-inner">
          <img src="${img.src}" alt="${img.alt}">
          <div class="lightbox-caption">Visit Projects Tab for More Information</div>
          <button class="cta-button lightbox-btn">Go to Projects</button>
        </div>
      `;
      lightbox.classList.add("show");

      // Add event listener for the new button
      const button = lightbox.querySelector(".lightbox-btn");
      button.addEventListener("click", () => {
        lightbox.classList.remove("show");
        openProjectsModal();
      });
    });
  });

  // Function to open Projects modal
  function openProjectsModal() {
    const projectsLink = document.querySelector('.nav-links a[data-modal="projects"]');
    const projectsModal = document.getElementById("projects");
    if (projectsModal && projectsLink) {
      projectsLink.classList.add("active");
      projectsModal.style.display = "block";
      document.body.style.overflow = "hidden";
      setTimeout(() => projectsModal.classList.add("visible"), 10);
    }
  }

  // Close when clicking outside
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });
});
