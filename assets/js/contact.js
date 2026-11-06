(() => {
  "use strict";

  const form = document.querySelector("#contact-form");
  const faq = document.querySelector("[data-contact-faq]");

  if (form instanceof HTMLFormElement) {
    const successMessage = document.querySelector("[data-form-success]");
    const errorMessage = form.querySelector("[data-form-error]");
    const errorText = form.querySelector("[data-form-error-message]");
    const pendingMessage = form.querySelector("[data-form-pending]");
    form.noValidate = true;

    const controls = [...form.querySelectorAll("input, select, textarea")]
      .filter((control) => control.name !== "form-name" && control.name !== "bot-field");
    const phone = form.querySelector("#phone-number");
    const phonePattern = /^[6-9]\d{9}$/;

    function normalizeText(control) {
      if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) return;

      const controlCharacters = control instanceof HTMLTextAreaElement
        ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
        : /[\u0000-\u001F\u007F]/g;
      control.value = control.value.replace(controlCharacters, "").trim();

      if (control.name === "full-name") {
        control.value = control.value.replace(/\s+/g, " ");
      }
    }

    function messageFor(control) {
      if (control.validity.valueMissing) {
        if (control.type === "checkbox") return "Please confirm your voluntary request to continue.";
        if (control.name === "consultation-mode") return "Please choose a consultation mode.";
        return "This field is required.";
      }

      if (control === phone && !phonePattern.test(phone.value)) {
        return "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
      }

      if (control.validity.typeMismatch) return "Enter a valid email address.";
      if (control.validity.tooShort) return `Enter at least ${control.minLength} characters.`;
      if (control.validity.patternMismatch) return control.title || "Enter a valid value.";

      return "";
    }

    function validateControl(control) {
      if (control === phone) {
        phone.setCustomValidity(
          phone.value && !phonePattern.test(phone.value)
            ? "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
            : "",
        );
      }

      const invalid = !control.validity.valid;
      const message = invalid ? messageFor(control) || control.validationMessage : "";
      const error = form.querySelector(`[data-error-for="${control.name}"]`);

      control.setAttribute("aria-invalid", String(invalid));
      if (error instanceof HTMLElement) error.textContent = message;
      return !invalid;
    }

    controls.forEach((control) => {
      control.addEventListener("blur", () => {
        normalizeText(control);
        if (control.dataset.touched === "true") validateControl(control);
      });

      const eventName = control.type === "radio" || control.type === "checkbox" || control instanceof HTMLSelectElement
        ? "change"
        : "input";

      control.addEventListener(eventName, () => {
        control.dataset.touched = "true";
        validateControl(control);
      });
    });

    form.addEventListener("submit", async (event) => {
      controls.forEach((control) => {
        normalizeText(control);
        control.dataset.touched = "true";
      });

      const invalidControls = controls.filter((control) => !validateControl(control));
      const firstInvalid = invalidControls[0];
      if (firstInvalid) {
        event.preventDefault();
        form.reportValidity();
        firstInvalid.focus();
        return;
      }

      event.preventDefault();
      if (window.location.protocol === "file:") {
        if (errorText instanceof HTMLElement) {
          errorText.textContent = "This form can only send requests from the live website";
        }
        if (errorMessage instanceof HTMLElement) errorMessage.hidden = false;
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (!(submitButton instanceof HTMLButtonElement)) {
        console.error("Unable to submit the consultation request: submit button was not found.");
        return;
      }

      submitButton.disabled = true;
      form.setAttribute("aria-busy", "true");
      if (pendingMessage instanceof HTMLElement) pendingMessage.hidden = false;
      if (errorMessage instanceof HTMLElement) errorMessage.hidden = true;

      try {
        const response = await fetch(new URL(form.getAttribute("action") || "/", window.location.origin), {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString(),
        });

        if (!response.ok) {
          throw new Error(`Consultation request returned HTTP ${response.status}.`);
        }

        if (!(successMessage instanceof HTMLElement)) {
          throw new Error("Consultation confirmation message was not found.");
        }

        form.hidden = true;
        successMessage.hidden = false;
        successMessage.focus();
      } catch (error) {
        console.error("Consultation request submission failed.", error);
        if (errorMessage instanceof HTMLElement) errorMessage.hidden = false;
      } finally {
        submitButton.disabled = false;
        form.removeAttribute("aria-busy");
        if (pendingMessage instanceof HTMLElement) pendingMessage.hidden = true;
      }
    });
  }

  if (faq instanceof HTMLElement) {
    faq.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const summary = event.target.closest("summary");
      const openedItem = summary?.parentElement;

      if (!(openedItem instanceof HTMLDetailsElement) || openedItem.open) return;

      faq.querySelectorAll("details[open]").forEach((item) => {
        if (item !== openedItem) item.open = false;
      });
    });
  }
})();
