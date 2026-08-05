(function () {
  // Medidas a escala reducida a propósito: el logo está muy cerca del
  // borde superior de la página (poco margen encima), así que la rama
  // tiene que caber en ese hueco sin salirse de la ventana al hacer
  // hover nada más cargar la página.
  var LEAF_D = "M0,0 C0.85,-1.7 3.3,-1.9 4.7,0 C3.3,1.9 0.85,1.7 0,0 Z";
  var LEAF_COLOR = "#585850";
  var SPARK_COLOR = "#D45B3E";

  // El tallo sale del logo y crece hacia arriba (con una ligera onda,
  // no una línea recta), tal y como en el boceto: ZA abajo, la rama
  // subiendo desde ahí, y el asterisco flotando por encima de la
  // punta, separado, no encajado en un rizo junto al logo.
  var STEM_D = "M5.7,43.5 C3.3,32.1 9.5,27.4 7.1,18 C5.7,11.4 10.4,7.6 12.8,1.9";
  var LEAF_FRACTIONS = [0.10, 0.28, 0.46, 0.64, 0.82, 0.97];
  var SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
  var SPARK_GAP = 6;

  var svgNS = "http://www.w3.org/2000/svg";

  function buildOliveBranch() {
    var wrap = document.createElement("span");
    wrap.className = "logo-branch-wrap";

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "logo-branch-svg");
    svg.setAttribute("width", "34");
    svg.setAttribute("height", "52");
    svg.setAttribute("viewBox", "0 0 34 52");

    var group = document.createElementNS(svgNS, "g");
    group.setAttribute("class", "logo-branch-group");
    group.style.opacity = "0";

    var stem = document.createElementNS(svgNS, "path");
    stem.setAttribute("class", "branch-stem");
    stem.setAttribute("d", STEM_D);
    stem.setAttribute("fill", "none");
    stem.setAttribute("stroke", LEAF_COLOR);
    stem.setAttribute("stroke-width", "1");
    stem.setAttribute("stroke-linecap", "round");
    group.appendChild(stem);

    var leavesGroup = document.createElementNS(svgNS, "g");
    leavesGroup.setAttribute("class", "branch-leaves");
    group.appendChild(leavesGroup);

    var sparkGroup = document.createElementNS(svgNS, "g");
    sparkGroup.setAttribute("class", "branch-spark");
    group.appendChild(sparkGroup);

    svg.appendChild(group);
    wrap.appendChild(svg);

    return {
      wrap: wrap,
      group: group,
      stem: stem,
      leavesGroup: leavesGroup,
      sparkGroup: sparkGroup,
    };
  }

  function growLeaves(branch) {
    var stem = branch.stem;
    var leavesGroup = branch.leavesGroup;
    var len = stem.getTotalLength();
    var pieces = [];

    LEAF_FRACTIONS.forEach(function (t, idx) {
      var p = stem.getPointAtLength(t * len);
      var p2 = stem.getPointAtLength(Math.min(len, t * len + 1));
      var angleDeg = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;

      var side = idx % 2 === 0 ? 1 : -1;
      var sideOffset = side * 55;
      var scale = 1.05 - (idx / (LEAF_FRACTIONS.length - 1)) * 0.4;

      var leaf = document.createElementNS(svgNS, "path");
      leaf.setAttribute("class", "branch-leaf");
      leaf.setAttribute("d", LEAF_D);
      leaf.setAttribute("fill", LEAF_COLOR);
      leaf.style.transformOrigin = "0px 0px";

      var baseTransform =
        "translate(" + p.x.toFixed(2) + "px," + p.y.toFixed(2) + "px) " +
        "rotate(" + (angleDeg + sideOffset).toFixed(1) + "deg)";

      leavesGroup.appendChild(leaf);
      pieces.push({ el: leaf, baseTransform: baseTransform, targetScale: scale });
    });

    // Punto y dirección de la punta del tallo, para dejar el asterisco
    // flotando por encima con un hueco (no pegado a la última hoja).
    var tip = stem.getPointAtLength(len);
    var justBeforeTip = stem.getPointAtLength(Math.max(0, len - 1));
    var tipAngle = Math.atan2(tip.y - justBeforeTip.y, tip.x - justBeforeTip.x);
    var sparkPoint = {
      x: tip.x + Math.cos(tipAngle) * SPARK_GAP,
      y: tip.y + Math.sin(tipAngle) * SPARK_GAP,
    };

    return { pieces: pieces, stemLength: len, sparkPoint: sparkPoint };
  }

  function buildSpark(sparkGroup, sparkPoint) {
    // OJO: no usar el atributo SVG "transform" aquí — en cuanto el
    // elemento también recibe un style.transform (para el pop de
    // escala), el atributo queda anulado por completo y la posición
    // se pierde. La traslación va dentro del propio style.transform,
    // igual que en las hojas.
    var baseTransform =
      "translate(" + sparkPoint.x.toFixed(2) + "px," + sparkPoint.y.toFixed(2) + "px)";
    sparkGroup.style.transformOrigin = "0px 0px";

    SPARK_ANGLES.forEach(function (deg) {
      var rad = (deg * Math.PI) / 180;
      var inner = 0.8;
      var outer = 3.4;
      var line = document.createElementNS(svgNS, "line");
      line.setAttribute("class", "branch-spark-line");
      line.setAttribute("x1", (Math.cos(rad) * inner).toFixed(2));
      line.setAttribute("y1", (Math.sin(rad) * inner).toFixed(2));
      line.setAttribute("x2", (Math.cos(rad) * outer).toFixed(2));
      line.setAttribute("y2", (Math.sin(rad) * outer).toFixed(2));
      line.setAttribute("stroke", SPARK_COLOR);
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-linecap", "round");
      sparkGroup.appendChild(line);
    });

    var core = document.createElementNS(svgNS, "circle");
    core.setAttribute("class", "branch-spark-core");
    core.setAttribute("r", "0.9");
    core.setAttribute("fill", SPARK_COLOR);
    sparkGroup.appendChild(core);

    return baseTransform;
  }

  function attachAnimation(link) {
    var branch = buildOliveBranch();
    link.appendChild(branch.wrap);

    var grown = growLeaves(branch);
    var pieces = grown.pieces;
    var stemLength = grown.stemLength;
    var stem = branch.stem;
    var group = branch.group;
    var wrap = branch.wrap;
    var sparkGroup = branch.sparkGroup;

    var sparkBaseTransform = buildSpark(sparkGroup, grown.sparkPoint);

    var timers = [];

    function clearTimers() {
      timers.forEach(function (t) {
        clearTimeout(t);
      });
      timers = [];
    }

    function play() {
      clearTimers();

      stem.style.transition = "none";
      stem.style.strokeDasharray = stemLength;
      stem.style.strokeDashoffset = stemLength;

      pieces.forEach(function (piece) {
        piece.el.style.transition = "none";
        piece.el.style.opacity = "0";
        piece.el.style.transform = piece.baseTransform + " scale(0.25)";
      });

      sparkGroup.style.transition = "none";
      sparkGroup.style.opacity = "0";
      sparkGroup.style.transform = sparkBaseTransform + " scale(0)";

      group.style.transition = "none";
      group.style.opacity = "1";

      void wrap.offsetWidth;

      // 1) el tallo se dibuja
      timers.push(
        setTimeout(function () {
          stem.style.transition = "stroke-dashoffset 0.55s ease-out";
          stem.style.strokeDashoffset = "0";
        }, 10)
      );

      // 2) las hojas van brotando en abanico a lo largo del tallo
      var leafStart = 90;
      var leafStagger = 75;

      pieces.forEach(function (piece, idx) {
        timers.push(
          setTimeout(function () {
            piece.el.style.transition =
              "opacity 0.25s ease-out, transform 0.25s ease-out";
            piece.el.style.opacity = "1";
            piece.el.style.transform =
              piece.baseTransform + " scale(" + piece.targetScale + ")";
          }, leafStart + idx * leafStagger)
        );
      });

      var leavesDone = leafStart + pieces.length * leafStagger;

      // 3) remate: el asterisco de "fuego artificial" hace un pop
      // flotando justo encima de la punta de la rama, con un pequeño
      // salto/rebote, como cierre de la animación
      var sparkStart = leavesDone + 150;

      timers.push(
        setTimeout(function () {
          sparkGroup.style.transition =
            "opacity 0.15s ease-out, transform 0.3s cubic-bezier(.34,1.56,.64,1)";
          sparkGroup.style.opacity = "1";
          sparkGroup.style.transform = sparkBaseTransform + " scale(1)";
        }, sparkStart)
      );

      // 4) breve pausa sosteniendo todo, y luego desaparece en un fade único
      var fadeStart = sparkStart + 300 + 450;

      timers.push(
        setTimeout(function () {
          group.style.transition = "opacity 0.5s ease-in";
          group.style.opacity = "0";
        }, fadeStart)
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
