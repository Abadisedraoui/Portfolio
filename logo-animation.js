(function () {
  var svgNS = "http://www.w3.org/2000/svg";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var sparklePath = "M-1-10 C1-5 1.3-2 4-1.3 L9.3-.2 C4 1.1 2 2.4 .6 8.7 C-.8 4-1.6 1.9-4.3 1 L-9-.5 C-4-1.2-2.4-3.1-1-10 Z";
  var petalPath = "M-2-2 C-5-5-5.5-11-2.4-13 C.6-15 4.8-12.6 4.4-8.7 C4.2-5.3 2.4-2.6 1-1.7 Z";

  function svgElement(tag, attributes) {
    var element = document.createElementNS(svgNS, tag);
    Object.keys(attributes).forEach(function (key) {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  }

  function clamp(value) {
    return Math.max(0, Math.min(1, value));
  }

  function attachAnimation(link) {
    if (link.querySelector(".logo-sparkles")) return;
    link.classList.add("logo-sparkle-link");

    // Coordinates match the approved preview and scale with the original logo.
    var svg = svgElement("svg", {
      "class": "logo-sparkles",
      "viewBox": "0 0 156 156",
      "aria-hidden": "true",
      "focusable": "false"
    });
    var pieces = [
      { x: 140, y: 124, size: 1.7, angle: -7, start: .48, duration: .4, color: "#e5c0cc" },
      { x: 167, y: 73, size: 1.6, angle: 0, start: .76, duration: .48, flower: true },
      { x: 139, y: 22, size: 2.1, angle: 9, start: 1.07, duration: .4, color: "#c8b9e1" }
    ];

    pieces.forEach(function (piece) {
      piece.element = svgElement("g", { opacity: "0" });
      if (piece.flower) {
        var petals = [
          [-3, 1, 1, "#fff1cc"], [49, .92, 1.05, "#fcebc5"],
          [104, 1.05, .96, "#fff3d3"], [153, .93, 1.02, "#fbecc9"],
          [208, 1.02, .94, "#fff1cc"], [259, .94, 1.04, "#fcedcd"],
          [307, 1.03, .97, "#fff3d4"]
        ];
        petals.forEach(function (petal) {
          piece.element.appendChild(svgElement("path", {
            d: petalPath,
            transform: "rotate(" + petal[0] + ") scale(" + petal[1] + " " + petal[2] + ")",
            fill: petal[3], stroke: "#ddcda9", "stroke-width": ".65", "stroke-linejoin": "round"
          }));
        });
        piece.element.appendChild(svgElement("path", {
          d: "M-4-.6 C-4.2-3.1-1.4-4.6 1.2-4 C4.3-3.4 4.8-.7 3.7 1.8 C2.5 4.4-.5 4.9-2.8 3 C-4 2-4.1 .8-4-.6 Z",
          fill: "#eed184"
        }));
        piece.element.appendChild(svgElement("path", {
          d: "M-1.6-1.3 Q-.2-2 1.3-1", fill: "none", stroke: "#f8e7b2",
          "stroke-width": "1", "stroke-linecap": "round"
        }));
      } else {
        piece.element.appendChild(svgElement("path", { d: sparklePath, fill: piece.color }));
      }
      svg.appendChild(piece.element);
    });
    link.appendChild(svg);

    var frameId = 0;
    function play() {
      if (frameId || reducedMotion.matches) return;
      // Omit the GIF's introductory pause so hover responds promptly.
      var startedAt = performance.now() - 400;
      function draw(now) {
        var time = (now - startedAt) / 1000;
        var fade = clamp((time - 2.18) / .46);
        pieces.forEach(function (piece) {
          var progress = 1 - Math.pow(1 - clamp((time - piece.start) / piece.duration), 3);
          var opacity = reducedMotion.matches ? 0 : clamp((time - piece.start) / .14) * (1 - fade);
          var initialScale = piece.flower ? .24 : .3;
          var scale = piece.size * (initialScale + (1 - initialScale) * progress);
          var x = piece.x - (piece.flower ? 7 * (1 - progress) : 0);
          var y = piece.y + (piece.flower ? 11 : 8) * (1 - progress) - fade * 3;
          var angle = piece.angle - (piece.flower ? 12 : 13) * (1 - progress);
          piece.element.setAttribute("opacity", opacity);
          piece.element.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + angle + ") scale(" + scale + ")");
        });
        frameId = time < 2.64 && !reducedMotion.matches ? requestAnimationFrame(draw) : 0;
      }
      frameId = requestAnimationFrame(draw);
    }
    link.addEventListener("mouseenter", play);
    link.addEventListener("focus", play);
  }

  function initLogoAnimation() {
    var links = document.querySelectorAll(".logo-link");
    if (!links.length) return;
    if (!document.getElementById("logo-sparkles-style")) {
      var style = document.createElement("style");
      style.id = "logo-sparkles-style";
      style.textContent =
        ".logo-link.logo-sparkle-link{position:relative;overflow:visible}" +
        ".logo-link.logo-sparkle-link:hover{opacity:1;transform:none}" +
        ".logo-sparkles{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;pointer-events:none}";
      document.head.appendChild(style);
    }
    links.forEach(attachAnimation);
  }


  function initPortfolioFixes() {
    // Keep the current Behance project URL even if an older link remains in the HTML.
    var behanceLink = document.querySelector(
      'a[href*="/251658619/Building-an-Immersive-Design-System"]'
    );
    if (behanceLink) {
      behanceLink.href =
        "https://www.behance.net/gallery/255997619/Building-an-Immersive-Design-System";
    }

    // The Plytix image files live directly in /images. Older markup still points
    // to a removed /images/plytix-pdf subfolder, including images inside the
    // inert processSlides template used to build the carousel.
    function fixPlytixImagePath(image) {
      var src = image.getAttribute("src");
      if (src && src.indexOf("images/plytix-pdf/") === 0) {
        image.setAttribute("src", src.replace("images/plytix-pdf/", "images/"));
      }
    }

    document
      .querySelectorAll('img[src^="images/plytix-pdf/"]')
      .forEach(fixPlytixImagePath);

    var processSlides = document.getElementById("processSlides");
    if (processSlides && processSlides.content) {
      processSlides.content
        .querySelectorAll('img[src^="images/plytix-pdf/"]')
        .forEach(fixPlytixImagePath);
    }

    // About-me expanded cards: all popups keep the same width, but that common
    // width is derived from the photos instead of stretching to the viewport.
    var modalCards = Array.from(document.querySelectorAll(".pokemon-modal-card"));
    if (!modalCards.length) return;

    var style = document.createElement("style");
    style.id = "pokemon-modal-natural-width-fix";
    style.textContent = [
      ".pokemon-modal-carousel {",
      "  width: var(--pokemon-modal-width, min(900px, calc(100vw - 112px))) !important;",
      "  max-width: var(--pokemon-modal-width, min(900px, calc(100vw - 112px))) !important;",
      "  margin-inline: auto;",
      "}",
      ".pokemon-modal-track {",
      "  width: 100%;",
      "}",
      ".pokemon-modal-card {",
      "  flex: 0 0 100% !important;",
      "  width: 100% !important;",
      "}",
      ".pokemon-modal-card .pokemon-card-face {",
      "  width: 100% !important;",
      "  max-width: none !important;",
      "  margin-inline: 0 !important;",
      "}",
      ".pokemon-modal-card .pokemon-card-heading h3 br {",
      "  display: none;",
      "}",
      "@media (max-width: 600px) {",
      "  .pokemon-modal-carousel {",
      "    width: calc(100vw - 32px) !important;",
      "    max-width: calc(100vw - 32px) !important;",
      "  }",
      "}",
    ].join("\n");
    document.head.appendChild(style);

    function sizeModalCards() {
      var desiredImageHeight = Math.max(180, window.innerHeight - 300);
      var sideClearance = window.innerWidth <= 600 ? 32 : 112;
      var viewportLimit = Math.max(280, window.innerWidth - sideClearance);
      var desktopCap = 960;
      var faceHorizontalPadding = 24;
      var candidateWidths = [];

      modalCards.forEach(function (card) {
        var image = card.querySelector(".pokemon-card-photo");
        if (!image || !image.naturalWidth || !image.naturalHeight) return;
        var ratio = image.naturalWidth / image.naturalHeight;
        candidateWidths.push((desiredImageHeight * ratio) + faceHorizontalPadding);
      });

      // Use one common width for all four cards. It follows the widest image at
      // the existing modal height, but is capped so the popup never becomes huge.
      var naturalCommonWidth = candidateWidths.length
        ? Math.max.apply(null, candidateWidths)
        : 900;
      var commonWidth = Math.min(viewportLimit, desktopCap, naturalCommonWidth);
      commonWidth = Math.max(320, commonWidth);

      document.documentElement.style.setProperty(
        "--pokemon-modal-width",
        Math.round(commonWidth) + "px"
      );
    }

    modalCards.forEach(function (card) {
      var image = card.querySelector(".pokemon-card-photo");
      if (image && !image.complete) {
        image.addEventListener("load", sizeModalCards);
      }
    });

    sizeModalCards();
    window.addEventListener("load", sizeModalCards);
    window.addEventListener("resize", sizeModalCards);

    var pokemonExpandButton = document.getElementById("pokemonExpandButton");
    if (pokemonExpandButton) {
      pokemonExpandButton.addEventListener("click", function () {
        requestAnimationFrame(sizeModalCards);
      });
    }
  }

  function initAll() {
    initLogoAnimation();
    initPortfolioFixes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
