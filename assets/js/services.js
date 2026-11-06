(() => {
  "use strict";

  const accordion = document.querySelector("[data-faq-accordion]");

  if (accordion instanceof HTMLElement) {
    accordion.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const summary = event.target.closest("summary");
      const openedItem = summary?.parentElement;
      if (!(openedItem instanceof HTMLDetailsElement) || openedItem.open) return;

      accordion.querySelectorAll("details[open]").forEach((item) => {
        if (item !== openedItem) item.open = false;
      });
    });
  }
})();
