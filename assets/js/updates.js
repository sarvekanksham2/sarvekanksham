(() => {
  "use strict";

  document.querySelectorAll(".update-thumbnail").forEach((image) => {
    const reportUnavailableImage = () => {
      image.classList.add("is-unavailable");
      console.error(`Unable to load update thumbnail: ${image.currentSrc || image.src}`);
    };

    image.addEventListener("error", reportUnavailableImage, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      reportUnavailableImage();
    }
  });
})();
