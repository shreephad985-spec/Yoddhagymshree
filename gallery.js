document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // --- Filter Logic ---
  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Toggle Active States
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const value = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (value === "all" || item.classList.contains(value)) {
          item.classList.remove("hide");
          item.style.display = ""; // Reset grid layout column behavior
        } else {
          item.classList.add("hide");
          item.style.display = "none"; // Hard collapse layout
        }
      });
    });
  });

  // --- Hover Card Animation ---
  galleryItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-10px)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0px)";
    });
  });

  // --- Lightbox Gallery Engine ---
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-btn");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  let activeImages = [];
  let current = 0;

  // Global Selector delegation to handle clicks clean across dynamic grid transitions
  document.querySelector(".row.g-4").addEventListener("click", (e) => {
    const card = e.target.closest(".gallery-card");
    if (!card) return; // Ignore if user clicks space between rows

    const img = card.querySelector("img");
    if (!img) return;

    // 1. Map currently active visible columns
    activeImages = Array.from(document.querySelectorAll(".gallery-item"))
      .filter(el => el.style.display !== "none" && !el.classList.contains("hide"))
      .map(el => el.querySelector(".gallery-card img"));

    // 2. Locate index
    current = activeImages.indexOf(img);

    if (current !== -1) {
      showImage();
    }
  });

  function showImage() {
    if (activeImages.length === 0 || !lightbox) return;

    // 1. Add the changing class to start the fade-out
    lightboxImg.classList.add("changing");

    // 2. Wait for the fade-out animation to finish (250ms matches the CSS transition)
    setTimeout(() => {
      lightbox.classList.add("show");
      lightboxImg.src = activeImages[current].src;

      // 3. Remove the class to smoothly fade the new image back in
      lightboxImg.classList.remove("changing");
    }, 250);
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      if (activeImages.length === 0) return;
      current = (current + 1) % activeImages.length;
      showImage();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      if (activeImages.length === 0) return;
      current = (current - 1 + activeImages.length) % activeImages.length;
      showImage();
    };
  }

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("show")) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  });

  // --- Unified Lightbox Controls Engine ---
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      // 1. Check if Close Button (or its icon) was clicked
      if (e.target.closest(".close-btn")) {
        e.stopPropagation();
        lightbox.classList.remove("show");
        return;
      }

      // 2. Check if Next Button (or its icon) was clicked
      if (e.target.closest(".next-btn")) {
        e.stopPropagation();
        if (activeImages.length === 0) return;
        current = (current + 1) % activeImages.length;
        showImage();
        return;
      }

      // 3. Check if Prev Button (or its icon) was clicked
      if (e.target.closest(".prev-btn")) {
        e.stopPropagation();
        if (activeImages.length === 0) return;
        current = (current - 1 + activeImages.length) % activeImages.length;
        showImage();
        return;
      }

      // 4. If clicked directly on the dark background overlay, close it
      if (e.target === lightbox) {
        lightbox.classList.remove("show");
      }
    });
  }
});