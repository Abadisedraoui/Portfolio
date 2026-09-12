(function () {
  "use strict";

  const CONSENT_KEY = "za-analytics-consent";
  const CONTENTSQUARE_URL = "https://t.contentsquare.net/uxa/a67c74590d182.js";

  function loadContentsquare() {
    if (document.querySelector(`script[src="${CONTENTSQUARE_URL}"]`)) return;

    const tag = document.createElement("script");
    tag.async = true;
    tag.src = CONTENTSQUARE_URL;
    document.head.appendChild(tag);
  }

  function spawnHeartPoof(rect) {
    const heart = document.createElement("div");
    heart.className = "consent-heart-poof";
    heart.setAttribute("aria-hidden", "true");
    heart.style.top = rect.top + "px";
    heart.style.left = rect.left + "px";
    heart.style.width = rect.width + "px";
    heart.style.height = rect.height + "px";
    heart.innerHTML = `
      <span class="consent-heart-poof__spark consent-heart-poof__spark--1"></span>
      <span class="consent-heart-poof__spark consent-heart-poof__spark--2"></span>
      <span class="consent-heart-poof__spark consent-heart-poof__spark--3"></span>
      <span class="consent-heart-poof__spark consent-heart-poof__spark--4"></span>
      <svg class="consent-heart-poof__icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 21s-6.7-4.35-9.3-8.28C1.02 10.4 1.4 7.1 4.1 5.4c2.2-1.4 4.9-.8 6.4 1.1.4.5 1 .5 1.4 0 1.5-1.9 4.2-2.5 6.4-1.1 2.7 1.7 3.08 5 1.4 7.32C18.7 16.65 12 21 12 21z"/>
      </svg>`;

    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2600);
  }

  function closeBannerWithHeart() {
    const banner = document.querySelector(".cookie-consent");
    if (!banner) return;

    const rect = banner.getBoundingClientRect();
    banner.remove();
    spawnHeartPoof(rect);
  }

  function showBanner() {
    if (document.querySelector(".cookie-consent")) return;

    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "true");
    banner.setAttribute("aria-labelledby", "cookie-consent-title");
    banner.innerHTML = `
      <div class="cookie-consent__content">
        <div class="cookie-consent__copy">
          <h2 id="cookie-consent-title">Help me improve this portfolio</h2>
          <p>I use <strong>Contentsquare</strong> to understand <strong>visits</strong>, <strong>clicks</strong> and <strong>scrolling</strong> so I can improve this portfolio. The data is not used to identify you, and your <strong>personal information remains private</strong>. Analytics will only load if you accept. <a href="privacy-page.html">Privacy Policy</a></p>
        </div>
        <div class="cookie-consent__actions">
          <button type="button" class="cookie-consent__button cookie-consent__button--secondary" data-consent="declined">Decline</button>
          <button type="button" class="cookie-consent__button cookie-consent__button--primary" data-consent="accepted">Accept analytics</button>
        </div>
      </div>`;

    document.body.appendChild(banner);
    banner.querySelector('[data-consent="accepted"]').focus();

    banner.addEventListener("click", function (event) {
      const button = event.target.closest("[data-consent]");
      if (!button) return;

      const choice = button.dataset.consent;
      localStorage.setItem(CONSENT_KEY, choice);
      closeBannerWithHeart();

      if (choice === "accepted") {
        loadContentsquare();
      } else if (document.querySelector(`script[src="${CONTENTSQUARE_URL}"]`)) {
        window.setTimeout(() => window.location.reload(), 1400);
      }
    });
  }

  function addSettingsControl() {
    const privacyLink = document.querySelector("footer .privacy");
    if (!privacyLink || document.querySelector(".cookie-settings-link")) return;

    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.className = "cookie-settings-link";
    settingsButton.textContent = "Cookie settings";
    settingsButton.addEventListener("click", function () {
      localStorage.removeItem(CONSENT_KEY);
      showBanner();
    });

    privacyLink.insertAdjacentElement("afterend", settingsButton);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const savedChoice = localStorage.getItem(CONSENT_KEY);

    addSettingsControl();
    if (!savedChoice) showBanner();
  });

  if (localStorage.getItem(CONSENT_KEY) === "accepted") {
    loadContentsquare();
  }
})();
