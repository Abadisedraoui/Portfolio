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

  function organiseFooterUtilities() {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    const moreHeading = Array.from(footer.querySelectorAll("h4")).find((heading) => {
      const label = heading.textContent.trim().toUpperCase();
      return label === "FEEDBACK IS WELCOME" || label === "MORE";
    });
    const privacyLink = footer.querySelector(".privacy");

    if (!moreHeading || !privacyLink) return;

    const moreBlock = moreHeading.parentElement;
    moreBlock.classList.add("footer-more");
    moreHeading.textContent = "MORE";

    const reviewLink = Array.from(moreBlock.querySelectorAll("a")).find((link) =>
      link.textContent.trim().toLowerCase().startsWith("review me")
    );
    if (reviewLink) reviewLink.textContent = "Review me";

    Array.from(moreBlock.querySelectorAll("a, button")).forEach((control) => {
      control.textContent = control.textContent.replace(/[↗→]\s*$/u, "").trim();
    });

    moreBlock.appendChild(privacyLink);

    if (!document.getElementById("footer-more-style")) {
      const style = document.createElement("style");
      style.id = "footer-more-style";
      style.textContent = `
        .footer .footer-more a::after,
        .footer .footer-more button::after {
          content: none !important;
        }
        .footer .footer-more .privacy {
          position: static;
          left: auto;
          bottom: auto;
          margin: 0 0 8px;
        }
        .footer .footer-more button.cookie-settings-link {
          display: block;
          margin: 0 0 8px;
          padding: 0;
          border: 0;
          background: transparent;
          color: white;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          font-style: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;
          text-align: left;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }
      `;
      document.head.appendChild(style);
    }
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

  /*
   * Portfolio entry selector — Iteration 5.
   * Iteration 1 remains in index.html, so this block can be removed to restore it.
   */
  function applyPortfolioEntryIteration5() {
    const modeDescription = document.getElementById("modeDescription");
    const identityLine = document.querySelector(".identity-line");
    const ctaRow = document.querySelector(".cta-row");
    if (!modeDescription || !identityLine || !ctaRow) return;

    const identityRole = identityLine.querySelector(".identity-role");
    if (identityRole) {
      identityRole.textContent = "UX/UI & Product Designer";
    }

    modeDescription.className = "mode-description mode-description-iteration-5";
    modeDescription.textContent = "Explore the same work in two different ways.";

    const buttons = Array.from(ctaRow.querySelectorAll(".btn-stone"));
    if (buttons[0]) buttons[0].setAttribute("data-mode-detail", "Concise & visual");
    if (buttons[1]) buttons[1].setAttribute("data-mode-detail", "Thorough & detailed");

    if (!document.getElementById("portfolio-entry-iteration-5-style")) {
      const style = document.createElement("style");
      style.id = "portfolio-entry-iteration-5-style";
      style.textContent = `
        .identity-line {
          color: var(--ink-soft) !important;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px !important;
          line-height: 1.5;
        }
        .identity-line .identity-name {
          color: var(--ink) !important;
          font-weight: 700;
        }
        .identity-line .identity-role {
          color: var(--ink-soft) !important;
          font-weight: 400;
        }
        .mode-description.mode-description-iteration-5 {
          max-width: 590px;
          margin-top: 10px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px !important;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: 0;
          color: var(--accent);
          text-wrap: balance;
        }
        .cta-row {
          margin-top: 8px !important;
          margin-bottom: 26px;
        }
        .cta-row .btn-stone[data-mode-detail]::after {
          content: attr(data-mode-detail);
          position: absolute;
          top: calc(100% + 7px);
          left: 0;
          width: 100%;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: 0;
          text-transform: none;
          white-space: nowrap;
          color: var(--ink-soft);
          pointer-events: none;
        }
        @media (min-width: 1000px) {
          .identity-line {
            font-size: 17px !important;
          }
          .mode-description.mode-description-iteration-5 {
            margin-top: 6px;
            font-size: 17px !important;
          }
          .entry-options {
            gap: 10px;
          }
          .cta-row {
            margin-top: 2px !important;
          }
          .cta-row .btn-stone[data-mode-detail]::after {
            font-size: 15px;
          }
        }
        @media (max-width: 560px) {
          .identity-line,
          .mode-description.mode-description-iteration-5 {
            font-size: 14px !important;
          }
          .mode-description.mode-description-iteration-5 {
            max-width: 340px;
            margin-top: 8px;
          }
          .cta-row .btn-stone[data-mode-detail]::after {
            font-size: 13px;
          }
        }
        @media (max-height: 440px) and (max-width: 599px) {
          .mode-description.mode-description-iteration-5 {
            margin-top: 5px;
            font-size: 13px !important;
            line-height: 1.4;
          }
          .cta-row {
            margin-top: 5px !important;
            margin-bottom: 22px;
          }
          .cta-row .btn-stone[data-mode-detail]::after {
            top: calc(100% + 4px);
            font-size: 12px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const savedChoice = localStorage.getItem(CONSENT_KEY);

    applyPortfolioEntryIteration5();
    organiseFooterUtilities();
    addSettingsControl();
    if (!savedChoice) showBanner();
  });

  if (localStorage.getItem(CONSENT_KEY) === "accepted") {
    loadContentsquare();
  }
})();
