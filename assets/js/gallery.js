(() => {
  "use strict";

  const filters = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".gallery-card")];
  const status = document.querySelector("[data-gallery-status]");
  const lightbox = document.querySelector("[data-gallery-lightbox]");
  const lightboxImage = lightbox?.querySelector("[data-gallery-lightbox-image]");
  const lightboxCaption = lightbox?.querySelector("[data-gallery-lightbox-caption]");
  const closeButton = lightbox?.querySelector("[data-gallery-close]");
  const previousButton = lightbox?.querySelector("[data-gallery-previous]");
  const nextButton = lightbox?.querySelector("[data-gallery-next]");

  let visibleCards = cards;
  let currentIndex = 0;
  let activeTrigger = null;

  function updateStatus() {
    const count = visibleCards.length;
    if (status instanceof HTMLElement) {
      status.textContent = `Showing ${count} photograph${count === 1 ? "" : "s"}`;
    }
  }

  function filterGallery(category) {
    visibleCards = cards.filter((card) => {
      const matches = category === "all" || card.dataset.category === category;
      card.hidden = !matches;
      return matches;
    });

    filters.forEach((filter) => {
      const isActive = filter.dataset.filter === category;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    updateStatus();
  }

  function showImage(index) {
    if (
      !(lightboxImage instanceof HTMLImageElement)
      || !(lightboxCaption instanceof HTMLElement)
      || visibleCards.length === 0
    ) {
      return;
    }

    currentIndex = (index + visibleCards.length) % visibleCards.length;
    const card = visibleCards[currentIndex];
    const trigger = card.querySelector("[data-gallery-open]");
    const image = card.querySelector("img");

    if (!(image instanceof HTMLImageElement)) {
      console.error("Gallery card is missing its image.");
      return;
    }

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    activeTrigger = trigger instanceof HTMLButtonElement ? trigger : null;
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      if (filter.dataset.filter) filterGallery(filter.dataset.filter);
    });
  });

  cards.forEach((card) => {
    const trigger = card.querySelector("[data-gallery-open]");
    const image = card.querySelector("img");

    trigger?.addEventListener("click", () => {
      if (!(lightbox instanceof HTMLDialogElement)) {
        console.error("Gallery lightbox dialog is unavailable.");
        return;
      }

      const index = visibleCards.indexOf(card);
      showImage(index);

      if (!lightbox.open) {
        lightbox.showModal();
        closeButton instanceof HTMLButtonElement && closeButton.focus();
      }
    });

    image?.addEventListener("error", () => {
      console.error(`Unable to load gallery image: ${image.currentSrc || image.src}`);
    }, { once: true });
  });

  closeButton?.addEventListener("click", () => {
    if (lightbox instanceof HTMLDialogElement) lightbox.close();
  });

  previousButton?.addEventListener("click", () => showImage(currentIndex - 1));
  nextButton?.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox && lightbox instanceof HTMLDialogElement) {
      lightbox.close();
    }
  });

  lightbox?.addEventListener("close", () => {
    if (activeTrigger?.isConnected && !activeTrigger.closest(".gallery-card")?.hidden) {
      activeTrigger.focus();
    }
  });

  lightbox?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(currentIndex + 1);
    }
  });

  updateStatus();
})();
