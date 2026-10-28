
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(
    ".filter-btn"
  );

  const portfolioItems = document.querySelectorAll(
    ".portfolio-item"
  );

  const emptyMessage = document.getElementById(
    "portfolio-empty"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      let visibleCount = 0;

      // Update active filter button
      filterButtons.forEach((btn) => {
        const isActive = btn === button;

        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      // Show or hide matching projects
      portfolioItems.forEach((item) => {
        const matches =
          selectedCategory === "all" ||
          item.dataset.category.split(" ").includes(selectedCategory);

        item.hidden = !matches;

        if (matches) visibleCount++;
      });

      // Display message for empty categories
      if (emptyMessage) {
        emptyMessage.hidden = visibleCount > 0;
      }
    });
  });
});


 // Preselect a package when following a package request link.
document.addEventListener("DOMContentLoaded", () => {
  const requested = new URLSearchParams(window.location.search).get("package");
  const selector = document.querySelector('select[name="project_type"]');

  if (!selector || !requested) return;

  
const packages = {
  "business-card": "Business Card Kit",
  "flyer-banner": "Flyer & Banner Kit",
  "social-media": "Social Media Kit",
  "visibility": "Business Visibility Kit",
  "launch": "Business Launch Kit",
  "website-design": "Website Design Kit"
};

  if (packages[requested]) {
    selector.value = packages[requested];
  }
});

/* Portfolio Case Study Image Viewer */
document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".project-gallery");

  if (!galleries.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "portfolio-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Portfolio image viewer");
  lightbox.hidden = true;

  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
    <div class="lightbox-image-container">
      <img class="lightbox-image" alt="">
    </div>
    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
    <div class="lightbox-counter"></div>
  `;

  document.body.appendChild(lightbox);

  const displayImage = lightbox.querySelector(".lightbox-image");
  const counter = lightbox.querySelector(".lightbox-counter");
  const closeButton = lightbox.querySelector(".lightbox-close");

  let images = [];
  let currentIndex = 0;
  let previousFocus = null;

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    const selected = images[currentIndex];

    displayImage.src = selected.currentSrc || selected.src;
    displayImage.alt = selected.alt;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function openLightbox(gallery, index) {
    images = Array.from(gallery.querySelectorAll("img"));
    if (!images.length) return;

    previousFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    showImage(index);
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    displayImage.removeAttribute("src");

    if (previousFocus) previousFocus.focus();
  }

  galleries.forEach((gallery) => {
    const galleryImages = gallery.querySelectorAll("img");

    galleryImages.forEach((img, index) => {
      img.style.cursor = "zoom-in";
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Enlarge: ${img.alt}`);

      img.addEventListener("click", () => openLightbox(gallery, index));

      img.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(gallery, index);
        }
      });
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  lightbox.querySelector(".lightbox-next").addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });
});

