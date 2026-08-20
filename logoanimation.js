(function () {
  // El tamaño de la corona ya NO es un número fijo adivinado a ojo: se
  // calcula a partir de la altura real del logo renderizado en cada
  // página (el CSS del logo usa "height: auto", así que su altura real
  // depende de la imagen y puede cambiar según el breakpoint). Así la
  // corona siempre llega hasta arriba del logo, no solo hasta la mitad.
  var LEAF_D = "M0,0 C0.85,-1.7 3.3,-1.9 4.7,0 C3.3,1.9 0.85,1.7 0,0 Z";
  var LEAF_COLOR = "#9a9a9a";

  // Media corona de laurel real: literalmente la mitad de una
  // circunferencia (borde recto y vertical pegado al logo, curva hacia
  // fuera por el otro lado), no un arco ancho y redondeado.
  var ARC_CX = 4;
  var ARC_THETA_START = 90; // abajo, pegado al logo
  var ARC_THETA_END = -90; // arriba, pegado al logo (borde recto)
  var ARC_STEM_STEPS = 60;

  // Cuánto debe sobrepasar la corona la altura real del logo, para que
  // se note que llega hasta la esquina de arriba — pero sin pasarse del
  // toolbar: este valor se ajustó para quedarse dentro del padding
  // superior del header (14px) con un margen de seguridad.
  var REACH_EXTRA = 6;
  // Tamaño mínimo, por si el logo aún no se puede medir (imagen sin
  // cargar todavía, o rota) — así nunca es más pequeña que antes.
  var MIN_ARC_R = 16;
  var FALLBACK_LOGO_HEIGHT = 40;

  var LEAF_T = [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1];
  var LEAF_SIDE_ANGLE = 52;

  var svgNS = "http://www.w3.org/2000/svg";

  function computeGeometry(logoHeight) {
    var reach = logoHeight + REACH_EXTRA; // distancia total que debe cubrir la corona en altura
    var r = (reach - 4) / 2; // mantiene la misma proporción CY = R + 4 usada en el diseño original
    if (r < MIN_ARC_R) r = MIN_ARC_R;
    var cy = r + 4;

    return {
      cx: ARC_CX,
      cy: cy,
      r: r,
      viewW: Math.ceil(ARC_CX + r + 8),
      viewH: Math.ceil(cy + r + 8),
    };
  }

  function measureLogoHeight(link) {
    var img = link.querySelector("img");
    if (!img || !img.naturalWidth || !img.naturalHeight) {
      return FALLBACK_LOGO_HEIGHT;
    }
    var cssWidth = img.getBoundingClientRect().width || img.offsetWidth;
    if (!cssWidth) {
      return FALLBACK_LOGO_HEIGHT;
    }
    return (img.naturalHeight / img.naturalWidth) * cssWidth;
  }

  function arcPoint(geom, deg) {
    var rad = (deg * Math.PI) / 180;
    return {
      x: geom.cx + geom.r * Math.cos(rad),
      y: geom.cy + geom.r * Math.sin(rad),
    };
  }

  function buildStemPath(geom) {
    var d = "";
    for (var i = 0; i <= ARC_STEM_STEPS; i++) {
      var deg = ARC_THETA_START + (ARC_THETA_END - ARC_THETA_START) * (i / ARC_STEM_STEPS);
      var p = arcPoint(geom, deg);
      d += (i === 0 ? "M" : "L") + p.x.toFixed(2) + "," + p.y.toFixed(2) + " ";
    }
    return d;
  }

  function buildOliveBranch(geom) {
    var wrap = document.createElement("span");
    wrap.className = "logo-branch-wrap";

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "logo-branch-svg");
    svg.setAttribute("width", String(geom.viewW));
    svg.setAttribute("height", String(geom.viewH));
    svg.setAttribute("viewBox", "0 0 " + geom.viewW + " " + geom.viewH);

    var group = document.createElementNS(svgNS, "g");
    group.setAttribute("class", "logo-branch-group");
    group.style.opacity = "0";

    var stem = document.createElementNS(svgNS, "path");
    stem.setAttribute("class", "branch-stem");
    stem.setAttribute("d", buildStemPath(geom));
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
    var geom = computeGeometry(measureLogoHeight(link));

    var branch = buildOliveBranch(geom);
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

  function initLogoLink(link) {
    var img = link.querySelector("img");

    // Si la imagen aún no ha cargado, esperamos a que cargue para medir
    // su altura real antes de construir la corona — así el tamaño se
    // calcula sobre el logo de verdad y no sobre una suposición.
    if (img && !img.complete) {
      img.addEventListener("load", function () {
        attachAnimation(link);
      }, { once: true });
      img.addEventListener("error", function () {
        attachAnimation(link);
      }, { once: true });
    } else {
      attachAnimation(link);
    }
  }

  function initLogoAnimation() {
    document.querySelectorAll(".logo-link").forEach(initLogoLink);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogoAnimation);
  } else {
    initLogoAnimation();
  }
})();
