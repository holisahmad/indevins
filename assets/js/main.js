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

  /* --- Hero slider --- */
  var slider = document.querySelector('[data-slider]');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('[data-slide]'));
    var dotsWrap = slider.querySelector('[data-dots]');
    var prevBtn = slider.querySelector('[data-prev]');
    var nextBtn = slider.querySelector('[data-next]');
    var current = 0;
    var timer = null;
    var DELAY = 6500;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', 'Tampilkan slide ' + (i + 1));
      dot.addEventListener('click', function () { show(i, true); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    var show = function (index, userInitiated) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle('is-active', active);
        if (active) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
      dots.forEach(function (dot, i) {
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (userInitiated) restart();
    };

    var stop = function () {
      if (timer) { window.clearInterval(timer); timer = null; }
    };
    var start = function () {
      if (reduceMotion.matches || slides.length < 2 || timer) return;
      timer = window.setInterval(function () { show(current + 1, false); }, DELAY);
    };
    var restart = function () { stop(); start(); };

    if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1, true); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1, true); });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', function (event) {
      if (!slider.contains(event.relatedTarget)) start();
    });
    slider.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { show(current - 1, true); }
      if (event.key === 'ArrowRight') { show(current + 1, true); }
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    if (typeof reduceMotion.addEventListener === 'function') {
      reduceMotion.addEventListener('change', function () {
        if (reduceMotion.matches) stop(); else start();
      });
    }

    show(0, false);
    start();
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

  /* --- Jadwal pelatihan (data dari assets/js/jadwal.js) --- */
  var jadwalWrap = document.querySelector('[data-jadwal]');
  if (jadwalWrap) {
    var escapeHtml = function (str) {
      return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };
    var jadwalData = Array.isArray(window.IDI_JADWAL) ? window.IDI_JADWAL.slice() : [];

    if (!jadwalData.length) {
      jadwalWrap.innerHTML =
        '<div class="jadwal-kosong">' +
        '<h3>Belum ada jadwal terbaru saat ini.</h3>' +
        '<p>Informasi kelas terbuka berikutnya akan diumumkan di halaman ini dan media sosial IDI. Untuk pelatihan in-house atau penjadwalan khusus perusahaan, silakan hubungi kami.</p>' +
        '<a class="btn btn-ghost" href="#kontak">Hubungi kami</a>' +
        '</div>';
    } else {
      jadwalData.sort(function (a, b) {
        return String(a.tanggal || '').localeCompare(String(b.tanggal || ''));
      });
      var rows = jadwalData.map(function (j) {
        var aksi = j.status === 'penuh'
          ? '<span class="badge badge-full">Kuota Penuh</span>'
          : '<a class="badge badge-open" href="https://wa.me/6281215400332?text=' +
              encodeURIComponent('Halo IDI, saya ingin mendaftar ' + (j.nama || '') + ' (' + (j.tanggalTampil || '') + ')') +
            '" target="_blank" rel="noopener">Daftar <span aria-hidden="true">→</span></a>';
        var catatan = j.catatan ? '<p class="jadwal-catatan">' + escapeHtml(j.catatan) + '</p>' : '';
        return '<article class="jadwal-row">' +
          '<p class="jadwal-tgl">' + escapeHtml(j.tanggalTampil || '') + '</p>' +
          '<div class="jadwal-info">' +
            '<h3>' + escapeHtml(j.nama || '') + '</h3>' +
            '<p class="jadwal-meta">' + escapeHtml(j.kota || '') + '</p>' +
            catatan +
          '</div>' +
          '<div class="jadwal-aksi">' + aksi + '</div>' +
        '</article>';
      });
      jadwalWrap.innerHTML = '<div class="jadwal-list">' + rows.join('') + '</div>';
    }
  }

  /* --- Footer year --- */
  var tahun = document.getElementById('tahun');
  if (tahun) tahun.textContent = String(new Date().getFullYear());

  /* --- Tombol kembali ke atas --- */
  (function () {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    function onScroll () {
      btn.hidden = window.scrollY <= 280;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
})();
