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
    const consent = form.querySelector("#bci-consent");
    const submitButton = form.querySelector('button[type="submit"]');
    const phonePattern = /^[6-9]\d{9}$/;
    let isSubmitting = false;

    if (consent instanceof HTMLInputElement && submitButton instanceof HTMLButtonElement) {
      const updateSubmitState = () => {
        submitButton.disabled = !consent.checked || isSubmitting;
      };

      consent.addEventListener("change", updateSubmitState);
      updateSubmitState();
    } else {
      console.error("Unable to control the consultation submit button: consent checkbox or submit button was not found.");
    }

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
        if (control === consent && control instanceof HTMLInputElement && !control.checked) {
          control.setAttribute("aria-invalid", "false");
          const error = form.querySelector(`[data-error-for="${control.name}"]`);
          if (error instanceof HTMLElement) error.textContent = "";
          return;
        }
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

      if (!(submitButton instanceof HTMLButtonElement)) {
        console.error("Unable to submit the consultation request: submit button was not found.");
        return;
      }

      isSubmitting = true;
      submitButton.disabled = true;
      form.setAttribute("aria-busy", "true");
      if (pendingMessage instanceof HTMLElement) pendingMessage.hidden = false;
      if (errorMessage instanceof HTMLElement) errorMessage.hidden = true;
      if (errorText instanceof HTMLElement) {
        errorText.textContent = "Your request could not be sent. Please try again";
      }

      try {
        const response = await fetch(new URL(form.getAttribute("action") || "/", window.location.origin), {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString(),
        });

        if (response.status === 404) {
          throw new Error("Netlify returned 404 for the form submission endpoint.");
        }

        if (!response.ok) {
          throw new Error(`Consultation request returned HTTP ${response.status}.`);
        }

        const responseBody = await response.text();
        if (/form not found|not found|404|page not found/i.test(responseBody)) {
          throw new Error("Netlify did not recognize the consultation form. Confirm form detection is enabled and redeploy.");
        }

        if (!(successMessage instanceof HTMLElement)) {
          throw new Error("Consultation confirmation message was not found.");
        }

        form.hidden = true;
        successMessage.hidden = false;
        successMessage.focus();
      } catch (error) {
        console.error("Consultation request submission failed.", error);
        if (errorText instanceof HTMLElement) {
          errorText.textContent = error instanceof Error && error.message.includes("form submission endpoint")
            ? "Our form service is not accepting requests right now. Please try again later"
            : "Your request could not be sent. Please try again";
        }
        if (errorMessage instanceof HTMLElement) errorMessage.hidden = false;
      } finally {
        isSubmitting = false;
        if (consent instanceof HTMLInputElement) {
          submitButton.disabled = !consent.checked;
        }
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
