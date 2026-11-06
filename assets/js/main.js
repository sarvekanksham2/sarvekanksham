(() => {
  "use strict";

  const toggle = document.querySelector(".site-nav__toggle");
  const navigation = document.getElementById("primary-navigation");
  const label = toggle?.querySelector(".site-nav__toggle-label");

  if (!(toggle instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) {
    return;
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Close navigation" : "Open navigation";
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const openConsultDialog = document.querySelector(".consult-options[open]");
    if (openConsultDialog instanceof HTMLDialogElement) {
      event.preventDefault();
      openConsultDialog.close();
      return;
    }

    const openProfile = document.querySelector(".team-profile-dialog[open]");
    if (openProfile instanceof HTMLDialogElement) {
      event.preventDefault();
      openProfile.close();
      return;
    }

    if (toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Node
      && !navigation.contains(event.target)
      && !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  let activeProfileTrigger = null;
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const trigger = event.target.closest("[data-open-team-profile]");
    if (!(trigger instanceof HTMLButtonElement)) return;

    const dialog = document.getElementById(trigger.dataset.openTeamProfile);
    if (!(dialog instanceof HTMLDialogElement)) {
      console.error("Unable to find the requested team profile dialog.");
      return;
    }

    activeProfileTrigger = trigger;
    dialog.showModal();
  });

  document.querySelectorAll(".team-profile-dialog").forEach((dialog) => {
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      dialog.close();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();

      if (event.target instanceof Element && event.target.closest("[data-close-team-profile]")) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", () => {
      if (activeProfileTrigger?.isConnected) activeProfileTrigger.focus();
      activeProfileTrigger = null;
    });
  });

  const consultDialog = document.createElement("dialog");
  consultDialog.className = "consult-options";
  consultDialog.setAttribute("aria-labelledby", "consult-options-title");
  consultDialog.innerHTML = `
    <div class="consult-options__content">
      <button class="consult-options__close" type="button" aria-label="Close consultation options" data-close-consult-options>&times;</button>
      <p class="consult-options__eyebrow">Consultation</p>
      <h2 id="consult-options-title">How would you like to proceed?</h2>
      <p>Request an appointment online, or call our office directly.</p>
      <div class="consult-options__actions">
        <a class="btn-primary consult-options__request" href="contact.html#full-name">
          <svg class="consult-options__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/>
            <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M12 12.5v5M9.5 15h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span>Request an appointment</span>
        </a>
        <a class="consult-options__call" href="tel:+919934021776">
          <svg class="consult-options__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M7.1 3.5h-3A1.6 1.6 0 0 0 2.5 5.2c.9 8.9 7.4 15.4 16.3 16.3a1.6 1.6 0 0 0 1.7-1.6v-3a1.6 1.6 0 0 0-1.3-1.6l-3.1-.6a1.6 1.6 0 0 0-1.6.7l-1.3 1.7a17.2 17.2 0 0 1-4.3-4.3l1.7-1.3a1.6 1.6 0 0 0 .7-1.6l-.6-3.1a1.6 1.6 0 0 0-1.6-1.3Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Call our office · +91-9934021776</span>
        </a>
      </div>
      <p class="consult-options__note">We will contact you to arrange a mutually convenient time.</p>
    </div>
  `;
  document.body.append(consultDialog);

  document.querySelectorAll("[data-consult-cta]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      consultDialog.showModal();
    });
  });

  consultDialog.addEventListener("click", (event) => {
    if (event.target === consultDialog) consultDialog.close();
    if (event.target instanceof Element && event.target.closest("[data-close-consult-options]")) {
      consultDialog.close();
    }

  });
})();
