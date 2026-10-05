(function () {
  "use strict";

  const ENDPOINT = "https://formspree.io/f/mgaoewzl";
  let lastFocused = null;

  function stoneButtonMarkup(label) {
    return `
      <svg viewBox="0 0 200 54" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="contact-btn-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fbfcfc"></stop>
            <stop offset="100%" stop-color="#e7e9e9"></stop>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 3px 3px rgba(40,35,47,.22))">
          <path d="M14.0,0.0 L57.0,0.26 L100.0,-0.98 L143.0,1.49 L186.0,0.0 L192.19,12.96 L200.0,25.0 L196.59,31.3 L192.54,37.24 L190.3,44.2 L186.0,50.0 L100.0,50.61 L14.0,50.0 L9.91,44.08 L7.54,37.2 L2.7,31.7 L0.0,25.0 L7.9,13.01 Z" fill="#b9bbbb" transform="translate(0,4)"></path>
          <path d="M14.0,0.0 L57.0,0.26 L100.0,-0.98 L143.0,1.49 L186.0,0.0 L192.19,12.96 L200.0,25.0 L196.59,31.3 L192.54,37.24 L190.3,44.2 L186.0,50.0 L100.0,50.61 L14.0,50.0 L9.91,44.08 L7.54,37.2 L2.7,31.7 L0.0,25.0 L7.9,13.01 Z" fill="url(#contact-btn-grad)" stroke="#28232f" stroke-width="1.6"></path>
        </g>
      </svg>
      <span class="contact-form__submit-label">${label}</span>
    `;
  }

  function buildDialog() {
    if (document.querySelector(".contact-dialog")) {
      return document.querySelector(".contact-dialog");
    }

    const dialog = document.createElement("section");
    dialog.className = "contact-dialog";
    dialog.hidden = true;
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "contact-dialog-title");

    dialog.innerHTML = `
      <div class="contact-dialog__backdrop" data-contact-close></div>
      <div class="contact-dialog__panel">
        <div class="contact-dialog__header">
          <h2 class="contact-dialog__title" id="contact-dialog-title">Email me</h2>
          <button class="contact-dialog__close" type="button" aria-label="Close contact form" data-contact-close>×</button>
        </div>

        <form class="contact-form" action="${ENDPOINT}" method="POST" novalidate>
          <div class="contact-form__field">
            <label for="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" autocomplete="name" required />
          </div>

          <div class="contact-form__field">
            <label for="contact-email">Your email</label>
            <input id="contact-email" name="email" type="email" autocomplete="email" required />
          </div>

          <div class="contact-form__field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" required></textarea>
          </div>

          <div class="contact-form__actions">
            <button class="contact-form__submit" type="submit">
              ${stoneButtonMarkup("Send")}
            </button>
          </div>

          <p class="contact-form__status" role="status" aria-live="polite"></p>
          <p class="contact-form__privacy">Your message is sent through Formspree. <a href="privacy-page.html">Privacy Policy</a></p>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelectorAll("[data-contact-close]").forEach(function (control) {
      control.addEventListener("click", closeDialog);
    });

    dialog.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeDialog();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'
        )
      ).filter(function (element) {
        return element.offsetParent !== null;
      });

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const form = dialog.querySelector(".contact-form");
    form.addEventListener("submit", submitForm);

    return dialog;
  }

  function openDialog(event) {
    if (event) event.preventDefault();

    const dialog = buildDialog();
    lastFocused = document.activeElement;

    dialog.hidden = false;
    document.body.classList.add("contact-dialog-open");

    const firstField = dialog.querySelector("#contact-name");
    window.setTimeout(function () {
      firstField.focus();
    }, 0);
  }

  function closeDialog() {
    const dialog = document.querySelector(".contact-dialog");
    if (!dialog || dialog.hidden) return;

    dialog.hidden = true;
    document.body.classList.remove("contact-dialog-open");

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  async function submitForm(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const submitButton = form.querySelector(".contact-form__submit");
    const submitLabel = form.querySelector(".contact-form__submit-label");
    const status = form.querySelector(".contact-form__status");

    status.textContent = "";
    status.removeAttribute("data-state");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = "Sending…";

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      form.reset();
      status.textContent = "Message sent. Thank you!";
      status.setAttribute("data-state", "success");
    } catch (error) {
      status.textContent = "Something went wrong. Please try again.";
      status.setAttribute("data-state", "error");
    } finally {
      submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = "Send";
    }
  }

  function init() {
    document.querySelectorAll('a[href="mailto:zainab.abadi.s@gmail.com"], .contact-form-trigger').forEach(function (link) {
      link.classList.add("contact-form-trigger");
      link.addEventListener("click", openDialog);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
