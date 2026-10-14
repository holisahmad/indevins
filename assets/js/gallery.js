(function () {
  'use strict';

  // Konfigurasi galeri — ubah di sini bila ada perubahan
  // count:        jumlah gambar (harus sama dengan jumlah file di assets/img/)
  // basePath:     folder gambar (relatif ke root situs)
  // prefix:       awalan nama file
  // ext:          ekstensi file
  // captionTemplate: fungsi yang menghasilkan caption dari nomor
  var CONFIG = {
    count: 20,
    basePath: 'assets/img/',
    prefix: 'gambar-',
    ext: '.jpeg',
    captionTemplate: function (n) { return 'Gambar ' + n; },
    initialCount: 6  // tampil awal: 6 gambar pertama (lebih banyak = scroll lebih panjang)
  };

  function buildList () {
    var items = [];
    for (var i = 1; i <= CONFIG.count; i++) {
      items.push({
        src: CONFIG.basePath + CONFIG.prefix + i + CONFIG.ext,
        alt: CONFIG.captionTemplate(i),
        caption: CONFIG.captionTemplate(i),
        index: i
      });
    }
    // sort numerik ascending berdasarkan angka indeks
    items.sort(function (a, b) { return a.index - b.index; });
    return items;
  }

  var list = buildList();

  var grid = document.getElementById('galeri-grid');
  if (!grid) return;

  // render setiap item
  list.forEach(function (item) {
    var el = document.createElement('div');
    el.className = 'gallery-item is-loading';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', 'Buka ' + item.alt + ' dalam tampilan besar');
    el.dataset.src = item.src;
    el.dataset.index = item.index;

    var img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.draggable = false;
    el.appendChild(img);

    var cap = document.createElement('div');
    cap.className = 'gallery-caption';
    cap.textContent = item.caption;
    el.appendChild(cap);

    grid.appendChild(el);

    // tanda loaded (gambar sudah ada di cache atau selesai dimuat)
    if (img.complete && img.naturalWidth > 0) {
      el.classList.remove('is-loading');
      el.classList.add('is-loaded');
    } else {
      img.addEventListener('load', function () {
        el.classList.remove('is-loading');
        el.classList.add('is-loaded');
      });
      img.addEventListener('error', function () {
        el.classList.remove('is-loading');
        el.classList.add('is-loaded');
        el.setAttribute('aria-label', 'Gambar tidak dapat dimuat: ' + item.alt);
      });
    }

    // click / keyboard -> lightbox
    el.addEventListener('click', function () { openLightbox(item.index); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item.index);
      }
    });
  });

  grid.classList.add('is-loaded');

  // batasi tampilan awal (load more)
  (function () {
    var moreWrap = document.getElementById('galeri-more-wrap');
    if (!moreWrap) return;
    var initial = CONFIG.initialCount || 6;
    if (list.length > initial) {
      for (var k = initial; k < grid.children.length; k++) {
        var child = grid.children[k];
        if (child) child.classList.add('gallery-item-hidden');
      }
      var btn = document.getElementById('galeri-show-more');
      if (btn) {
        btn.addEventListener('click', function () {
          var hiddenItems = grid.querySelectorAll('.gallery-item-hidden');
          hiddenItems.forEach(function (el) { el.classList.remove('gallery-item-hidden'); });
          moreWrap.hidden = true;
          btn.remove();
        });
      }
    }
  })();

  // ---- lightbox ----
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Tampilan gambar besar');

  var lbImg = document.createElement('img');
  lbImg.className = 'lightbox-img';
  lbImg.setAttribute('alt', '');
  lbImg.setAttribute('draggable', 'false');

  var lbCaption = document.createElement('div');
  lbCaption.className = 'lightbox-caption';

  var lbClose = document.createElement('button');
  lbClose.className = 'lightbox-close';
  lbClose.setAttribute('aria-label', 'Tutup tampilan besar');
  lbClose.textContent = '×';

  var lbPrev = document.createElement('button');
  lbPrev.className = 'lightbox-nav lightbox-prev';
  lbPrev.setAttribute('aria-label', 'Gambar sebelumnya');
  lbPrev.textContent = '‹';

  var lbNext = document.createElement('button');
  lbNext.className = 'lightbox-nav lightbox-next';
  lbNext.setAttribute('aria-label', 'Gambar berikutnya');
  lbNext.textContent = '›';

  lightbox.appendChild(lbPrev);
  lightbox.appendChild(lbImg);
  lightbox.appendChild(lbNext);
  lightbox.appendChild(lbCaption);
  lightbox.appendChild(lbClose);
  document.body.appendChild(lightbox);

  var currentIndex = null;

  function openLightbox (i) {
    currentIndex = i;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { lbClose.focus(); }, 50);
  }

  function closeLightbox () {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    currentIndex = null;
  }

  function updateLightbox () {
    if (currentIndex === null) return;
    var item = list[currentIndex - 1];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCaption.textContent = item.caption;
    lbPrev.disabled = currentIndex <= 1;
    lbNext.disabled = currentIndex >= list.length;
    lbPrev.style.visibility = lbPrev.disabled ? 'hidden' : 'visible';
    lbNext.style.visibility = lbNext.disabled ? 'hidden' : 'visible';
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function () {
    if (currentIndex > 1) { currentIndex--; updateLightbox(); }
  });
  lbNext.addEventListener('click', function () {
    if (currentIndex < list.length) { currentIndex++; updateLightbox(); }
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); if (currentIndex > 1) { currentIndex--; updateLightbox(); } }
    else if (e.key === 'ArrowRight') { e.preventDefault(); if (currentIndex < list.length) { currentIndex++; updateLightbox(); } }
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // saat lightbox ditutup, kembalikan fokus ke elemen yang dibuka (jika ada)
  lightbox.addEventListener('click', function () {
    // focus dikembalikan secara otomatis saat document.body overflow hilang;
    // lebih baik fokus ke tombol tutup agar user tidak lost
  });
})();
