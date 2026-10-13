/* PT Indonesia Development Inspire — site behavior
   Progressive enhancement only: nav disclosure, scroll state,
   active section highlight, reveal-on-scroll. No dependencies. */
(function () {
  'use strict';

  /* --- Keyboard navigation detection (guarantees a visible focus ring) --- */
  var onKeyDown = function (event) {
    if (event.key === 'Tab') document.body.classList.add('keyboard-nav');
  };
  var onPointer = function () { document.body.classList.remove('keyboard-nav'); };
  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointer, true);
  document.addEventListener('touchstart', onPointer, { passive: true, capture: true });

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- Mobile navigation disclosure --- */
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    var label = toggle.querySelector('.visually-hidden');
    if (label) label.textContent = open ? 'Tutup menu navigasi' : 'Buka menu navigasi';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!event.target.closest('#site-nav') && !event.target.closest('.nav-toggle')) setNav(false);
    });

    // Reset state when switching to desktop layout
    var desktop = window.matchMedia('(min-width: 52.01rem)');
    var onChange = function (event) { if (event.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* --- Header scroll state --- */
  var ticking = false;
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  updateHeader();

  /* --- Active section highlight --- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (link) { linkFor[link.getAttribute('href').slice(1)] = link; });

    var setActive = function (id) {
      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* --- Reveal on scroll --- */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!revealTargets.length) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealTargets.forEach(function (el) { revealObserver.observe(el); });

  /* --- Footer year --- */
  var tahun = document.getElementById('tahun');
  if (tahun) tahun.textContent = String(new Date().getFullYear());
})();
