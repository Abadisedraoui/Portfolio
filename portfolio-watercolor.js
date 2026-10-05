(function () {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const palette = ['#b8d1e5', '#c3d8cc', '#e5c4c6'];
  let paletteIndex = 0;
  let leaving = false;
  let buttonId = 0;
  const ns = 'http://www.w3.org/2000/svg';
  try { paletteIndex = Number(sessionStorage.getItem('za-watercolor-palette')) || 0; } catch (_) {}

  function nextColor() {
    const color = palette[paletteIndex % palette.length];
    paletteIndex += 1;
    try { sessionStorage.setItem('za-watercolor-palette', String(paletteIndex)); } catch (_) {}
    return color;
  }
  function svgElement(tag, attributes) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    return element;
  }
  function prepareButton(button) {
    if (button.dataset.watercolorReady) return;
    const svg = button.querySelector('svg');
    const shape = svg && svg.querySelector('path[stroke]');
    if (!shape) return;
    button.dataset.watercolorReady = 'true';
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const defs = svg.querySelector('defs') || svg.insertBefore(svgElement('defs', {}), svg.firstChild);
    const clipId = 'watercolor-button-clip-' + buttonId++;
    const clip = svgElement('clipPath', {id: clipId});
    clip.appendChild(svgElement('path', {d: shape.getAttribute('d')}));
    defs.appendChild(clip);
    const outline = shape.cloneNode(false);
    outline.setAttribute('fill', 'none');
    shape.removeAttribute('stroke');
    const pigment = svgElement('g', {'clip-path': 'url(#' + clipId + ')'});
    pigment.appendChild(svgElement('image', {href: 'images/watercolor-paper.webp', width: 200, height: 54, opacity: '.24', preserveAspectRatio: 'xMidYMid slice'}));
    const bloom = svgElement('rect', {x: -40, y: -35, width: 280, height: 124, rx: 62, fill: palette[0], class: 'watercolor-button-bloom'});
    pigment.appendChild(bloom);
    shape.parentNode.appendChild(pigment);
    shape.parentNode.appendChild(outline);
    button.addEventListener('click', function (event) {
      // Keep native new-tab, modified-click and non-navigation behavior.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (button.disabled) return;
      if (button.type === 'submit' && button.form && !button.form.checkValidity()) return;
      const isEntryLink = button.matches('.cta-row a.btn-stone');
      if (isEntryLink && (button.hasAttribute('download') || (button.target && button.target !== '_self'))) return;
      if (isEntryLink) {
        event.preventDefault();
        if (leaving) return;
        leaving = true;
      }
      bloom.setAttribute('fill', nextColor());
      button.classList.add('is-blushing');
      if (isEntryLink) window.setTimeout(() => window.location.assign(button.href), motion.matches ? 0 : 440);
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-washed');
      observer.unobserve(entry.target);
    });
  }, {threshold: .12}) : null;
  function prepareSurface(surface) {
    if (surface.classList.contains('watercolor-surface')) return;
    surface.classList.add('watercolor-surface');
    if (motion.matches || !observer) surface.classList.add('is-washed');
    else observer.observe(surface);
  }
  const surfaceSelector = '.project-intro, .quick-case__intro, .work-card.text-card, .footer, .cookie-consent, .contact-dialog__panel';
  function prepare(root) {
    if (root.nodeType !== 1 && root !== document) return;
    if (root.matches && root.matches(surfaceSelector)) prepareSurface(root);
    root.querySelectorAll(surfaceSelector).forEach(prepareSurface);
    if (root.matches && root.matches('.btn-stone, .contact-form__submit')) prepareButton(root);
    root.querySelectorAll('.btn-stone, .contact-form__submit').forEach(prepareButton);
  }
  function init() {
    prepare(document);
    new MutationObserver(function (mutations) {
      mutations.forEach(mutation => mutation.addedNodes.forEach(prepare));
    }).observe(document.body, {childList: true, subtree: true});
  }
  window.addEventListener('pageshow', function () {
    leaving = false;
    document.querySelectorAll('.is-blushing').forEach(button => button.classList.remove('is-blushing'));
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
