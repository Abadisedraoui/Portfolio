(function () {
  function buildSignature() {
    var wrap = document.createElement("span");
    wrap.className = "logo-signature";

    ["b", "a", "d", "i"].forEach(function (ch) {
      var s = document.createElement("span");
      s.className = "letter";
      s.textContent = ch;
      wrap.appendChild(s);
    });

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "logo-fire-svg");
    svg.setAttribute("width", "60");
    svg.setAttribute("height", "70");
    svg.setAttribute("viewBox", "0 0 60 70");

    var g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "logo-fire-group");
    g.style.opacity = "0";

    var lines = document.createElementNS(svgNS, "g");
    lines.setAttribute("stroke", "#9a9a9a");
    lines.setAttribute("stroke-width", "2");
    lines.setAttribute("stroke-linecap", "round");

    var angles = [-70, -40, -15, 10, 35, 60];
    angles.forEach(function (deg) {
      var rad = (deg * Math.PI) / 180;
      var x2 = 15 + Math.cos(rad) * 20;
      var y2 = 35 + Math.sin(rad) * 20;
      var line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", 15);
      line.setAttribute("y1", 35);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      lines.appendChild(line);
    });

    g.appendChild(lines);
    svg.appendChild(g);
    wrap.appendChild(svg);

    return wrap;
  }

  function attachAnimation(link) {
    var signature = buildSignature();
    link.appendChild(signature);

    var letters = signature.querySelectorAll(".letter");
    var fireGroup = signature.querySelector(".logo-fire-group");
    var stagger = 260;
    var timers = [];

    function clearTimers() {
      timers.forEach(function (t) {
        clearTimeout(t);
      });
      timers = [];
    }

    function play() {
      clearTimers();

      letters.forEach(function (el) {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.transform = "translateY(4px) rotate(-3deg)";
      });

      signature.style.transition = "none";
      signature.style.opacity = "1";

      fireGroup.style.transition = "none";
      fireGroup.style.opacity = "0";
      fireGroup.style.transform = "scale(0.3)";
      fireGroup.style.transformOrigin = "15px 35px";

      void signature.offsetWidth;

      letters.forEach(function (el, idx) {
        timers.push(
          setTimeout(function () {
            el.style.transition =
              "opacity 0.22s ease-out, transform 0.22s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) rotate(0deg)";
          }, idx * stagger)
        );
      });

      var afterLetters = letters.length * stagger + 150;

      timers.push(
        setTimeout(function () {
          fireGroup.style.transition =
            "opacity 0.35s ease-out, transform 0.35s ease-out";
          fireGroup.style.opacity = "1";
          fireGroup.style.transform = "scale(1)";
        }, afterLetters)
      );

      timers.push(
        setTimeout(function () {
          fireGroup.style.transition = "opacity 0.5s ease-in";
          fireGroup.style.opacity = "0";
          signature.style.transition = "opacity 0.5s ease-in";
          signature.style.opacity = "0";
        }, afterLetters + 450)
      );
    }

    link.addEventListener("mouseenter", play);
  }

  function initLogoAnimation() {
    document.querySelectorAll(".logo-link").forEach(attachAnimation);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogoAnimation);
  } else {
    initLogoAnimation();
  }
})();
