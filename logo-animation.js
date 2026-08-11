(function () {
  // Medidas a escala reducida a propósito: el logo está muy cerca del
  // borde superior de la página (poco margen encima), así que la
  // corona tiene que caber en ese hueco sin salirse de la ventana al
  // hacer hover nada más cargar la página.
  var LEAF_D = "M0,0 C0.85,-1.7 3.3,-1.9 4.7,0 C3.3,1.9 0.85,1.7 0,0 Z";
  var LEAF_COLOR = "#9a9a9a";

  // Media corona de laurel real: literalmente la mitad de una
  // circunferencia (borde recto y vertical pegado al logo, curva
  // hacia fuera por el otro lado), no un arco ancho y redondeado.
  // Por eso el lienzo es alto y estrecho, igual que la referencia.
  var ARC_CX = 4;
  var ARC_CY = 20;
  var ARC_R = 16;
  var ARC_THETA_START = 90; // abajo, pegado al logo
  var ARC_THETA_END = -90; // arriba, pegado al logo (borde recto)
  var ARC_STEM_STEPS = 60;

  var VIEW_W = Math.ceil(ARC_CX + ARC_R + 8);
  var VIEW_H = Math.ceil(ARC_CY + ARC_R + 8);

  var LEAF_T = [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1];
  var LEAF_SIDE_ANGLE = 52;

  var svgNS = "http://www.w3.org/2000/svg";

  function arcPoint(deg) {
    var rad = (deg * Math.PI) / 180;
    return {
      x: ARC_CX + ARC_R * Math.cos(rad),
      y: ARC_CY + ARC_R * Math.sin(rad),
    };
  }

  function buildStemPath() {
    var d = "";
    for (var i = 0; i <= ARC_STEM_STEPS; i++) {
      var deg = ARC_THETA_START + (ARC_THETA_END - ARC_THETA_START) * (i / ARC_STEM_STEPS);
      var p = arcPoint(deg);
      d += (i === 0 ? "M" : "L") + p.x.toFixed(2) + "," + p.y.toFixed(2) + " ";
    }
    return d;
  }

  function buildOliveBranch() {
    var wrap = document.createElement("span");
    wrap.className = "logo-branch-wrap";

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "logo-branch-svg");
    svg.setAttribute("width", String(VIEW_W));
    svg.setAttribute("height", String(VIEW_H));
    svg.setAttribute("viewBox", "0 0 " + VIEW_W + " " + VIEW_H);

    var group = document.createElementNS(svgNS, "g");
    group.setAttribute("class", "logo-branch-group");
    group.style.opacity = "0";

    var stem = document.createElementNS(svgNS, "path");
    stem.setAttribute("class", "branch-stem");
    stem.setAttribute("d", buildStemPath());
    stem.setAttribute("fill", "none");
    stem.setAttribute("stroke", LEAF_COLOR);
    stem.setAttribute("stroke-width", "0.5");
    stem.setAttribute("stroke-linecap", "round");
    group.appendChild(stem);

    var leavesGroup = document.createElementNS(svgNS, "g");
    leavesGroup.setAttribute("class", "branch-leaves");
    group.appendChild(leavesGroup);

    svg.appendChild(group);
    wrap.appendChild(svg);

    return {
      wrap: wrap,
      group: group,
      stem: stem,
      leavesGroup: leavesGroup,
    };
  }

  function makeLeaf(leavesGroup, p, angleDeg, sideSign, scale) {
    var leaf = document.createElementNS(svgNS, "path");
    leaf.setAttribute("class", "branch-leaf");
    leaf.setAttribute("d", LEAF_D);
    leaf.setAttribute("fill", LEAF_COLOR);
    leaf.style.transformOrigin = "0px 0px";

    var baseTransform =
      "translate(" + p.x.toFixed(2) + "px," + p.y.toFixed(2) + "px) " +
      "rotate(" + (angleDeg + sideSign * LEAF_SIDE_ANGLE).toFixed(1) + "deg)";

    leavesGroup.appendChild(leaf);
    return { el: leaf, baseTransform: baseTransform, targetScale: scale, groupIndex: 0 };
  }

  function growLeaves(branch) {
    var stem = branch.stem;
    var leavesGroup = branch.leavesGroup;
    var len = stem.getTotalLength();
    var pieces = [];

    LEAF_T.forEach(function (t, idx) {
      var frac = 0.04 + t * 0.94;
      var p = stem.getPointAtLength(frac * len);
      var p2 = stem.getPointAtLength(Math.min(len, frac * len + 1));
      var angleDeg = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;

      // Hojas más grandes en el centro del arco, más pequeñas en los
      // dos extremos — como en una corona de laurel real.
      var scale = 0.8 + Math.sin(t * Math.PI) * 0.7;

      [1, -1].forEach(function (side) {
        var piece = makeLeaf(leavesGroup, p, angleDeg, side, scale);
        piece.groupIndex = idx;
        pieces.push(piece);
      });
    });

    // Pequeño rizo extra justo en la base, como el remate que tienen
    // las coronas de laurel al arrancar el tallo.
    var basePoint = stem.getPointAtLength(0);
    var basePoint2 = stem.getPointAtLength(Math.min(len, 1));
    var baseAngle = Math.atan2(basePoint2.y - basePoint.y, basePoint2.x - basePoint.x) * 180 / Math.PI;
    var curl = makeLeaf(leavesGroup, basePoint, baseAngle - 70, 1, 0.5);
    curl.groupIndex = -1;
    pieces.unshift(curl);

    return { pieces: pieces, stemLength: len };
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

    var maxGroupIndex = pieces.reduce(function (max, piece) {
      return Math.max(max, piece.groupIndex);
    }, 0);

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

      // 2) las hojas van brotando en pares a lo largo del arco
      var leafStart = 90;
      var leafStagger = 65;

      pieces.forEach(function (piece) {
        timers.push(
          setTimeout(function () {
            piece.el.style.transition =
              "opacity 0.25s ease-out, transform 0.25s ease-out";
            piece.el.style.opacity = "1";
            piece.el.style.transform =
              piece.baseTransform + " scale(" + piece.targetScale + ")";
          }, leafStart + piece.groupIndex * leafStagger)
        );
      });

      var leavesDone = leafStart + maxGroupIndex * leafStagger + leafStagger;

      // 3) breve pausa sosteniendo la corona completa, y luego
      // desaparece en un fade único
      var fadeStart = leavesDone + 550;

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
