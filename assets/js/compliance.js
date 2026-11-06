(() => {
  "use strict";

  const CONSENT_KEY = "sarve_bci_consent";
  const TRANSITION_FALLBACK_MS = 240;
  let modal;
  let agreeButton;
  let previousFocus = null;
  let previousOverflow = "";
  let inertElements = [];
  let acceptedForSession = false;
  let isOpen = false;
  let hideTimer;

  function readConsent() {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (!saved) return false;
      const consent = JSON.parse(saved);
      return consent.accepted === true && typeof consent.timestamp === "string";
    } catch (error) {
      console.error("Unable to read BCI consent from localStorage.", error);
      return acceptedForSession;
    }
  }

  function saveConsent() {
    const value = JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString()
    });

    try {
      window.localStorage.setItem(CONSENT_KEY, value);
      acceptedForSession = true;
    } catch (error) {
      console.error("Unable to save BCI consent to localStorage.", error);
      acceptedForSession = true;
    }
  }

  function createModal() {
    const overlay = document.createElement("div");
    overlay.className = "compliance-modal";
    overlay.id = "bci-compliance-modal";
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");

    const dialog = document.createElement("section");
    dialog.className = "compliance-modal__dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "bci-compliance-title");
    dialog.setAttribute("aria-describedby", "bci-compliance-copy");

    const header = document.createElement("header");
    header.className = "compliance-modal__header";
    const icon = document.createElement("span");
    icon.className = "compliance-modal__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✓";
    const title = document.createElement("h2");
    title.id = "bci-compliance-title";
    title.textContent = "DISCLAIMER & ACKNOWLEDGMENT";
    header.append(icon, title);

    const content = document.createElement("div");
    content.className = "compliance-modal__content";
    content.id = "bci-compliance-copy";
    const template = document.querySelector("[data-compliance-disclaimer]");
    if (!(template instanceof HTMLTemplateElement)) {
      throw new Error("The BCI disclaimer template is missing from the page.");
    }
    content.append(template.content.cloneNode(true));

    const footer = document.createElement("footer");
    footer.className = "compliance-modal__footer";
    const button = document.createElement("button");
    button.className = "btn-primary compliance-modal__agree";
    button.type = "button";
    button.textContent = "Accept & Proceed →";
    footer.append(button);

    dialog.append(header, content, footer);
    overlay.append(dialog);
    document.body.append(overlay);
    return { overlay, button };
  }

  function setBackgroundInert(inert) {
    if (inert) {
      inertElements = Array.from(document.body.children)
        .filter((element) => element !== modal)
        .map((element) => {
          const wasInert = element.inert;
          element.inert = true;
          return { element, wasInert };
        });
      return;
    }

    inertElements.forEach(({ element, wasInert }) => {
      element.inert = wasInert;
    });
    inertElements = [];
  }

  function openModal() {
    if (isOpen) return;
    window.clearTimeout(hideTimer);
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    isOpen = true;
    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
      agreeButton.focus();
    });
  }

  function closeModal() {
    if (!isOpen) return;
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousOverflow;
    setBackgroundInert(false);
    isOpen = false;
    const focusTarget = previousFocus;
    previousFocus = null;

    hideTimer = window.setTimeout(() => {
      if (isOpen) return;
      modal.hidden = true;
      if (focusTarget?.isConnected) focusTarget.focus();
    }, TRANSITION_FALLBACK_MS);
  }

  function getFocusableElements() {
    return Array.from(modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((element) => element instanceof HTMLElement && element.offsetParent !== null);
  }

  function handleKeydown(event) {
    if (!isOpen || event.key !== "Tab") return;
    const focusable = getFocusableElements();
    if (focusable.length === 0) {
      event.preventDefault();
      agreeButton.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  function initialize() {
    const created = createModal();
    modal = created.overlay;
    agreeButton = created.button;

    agreeButton.addEventListener("click", () => {
      if (!readConsent()) saveConsent();
      closeModal();
    });

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("click", (event) => {
      const trigger = event.target instanceof Element
        ? event.target.closest("[data-open-compliance]")
        : null;
      if (trigger) {
        event.preventDefault();
        openModal();
      }
    });

    if (!readConsent()) openModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
