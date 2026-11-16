/* Portfolio – Katarzyna Tondaś
   Język EN/PL, menu mobilne, filtrowanie projektów, powiększanie obrazów, animacje.
   Angielski (domyślny) jest zapisany w HTML, polski w assets/js/translations.js. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* ----- Język ----- */
  var PL = window.PORTFOLIO_PL || {};
  var LOCALE = { en: 'en_US', pl: 'pl_PL' };
  var STORAGE_KEY = 'portfolio-lang';

  var textNodes = [];
  var attrNodes = [];

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    textNodes.push({ el: el, key: el.getAttribute('data-i18n'), en: el.innerHTML });
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var parts = pair.split(':');
      if (parts.length === 2) {
        var attr = parts[0].trim();
        attrNodes.push({ el: el, attr: attr, key: parts[1].trim(), en: el.getAttribute(attr) });
      }
    });
  });

  var langButtons = document.querySelectorAll('.lang-switch__btn');

  function applyLanguage(lang) {
    var pl = lang === 'pl';

    textNodes.forEach(function (n) {
      n.el.innerHTML = pl && PL[n.key] ? PL[n.key] : n.en;
    });
    attrNodes.forEach(function (n) {
      n.el.setAttribute(n.attr, pl && PL[n.key] ? PL[n.key] : n.en);
    });

    root.lang = lang;

    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute('content', LOCALE[lang]);

    langButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* tryb prywatny – pomijamy */ }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });

  /* Domyślnie angielski; polski tylko gdy wybrany wcześniej (?lang=pl też działa) */
  var initial = 'en';
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pl' || saved === 'en') initial = saved;
  } catch (e) { /* brak dostępu do localStorage */ }

  var qs = /[?&]lang=(pl|en)\b/.exec(window.location.search);
  if (qs) initial = qs[1];

  if (initial !== 'en') applyLanguage(initial);

  /* ----- Menu mobilne ----- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ----- Filtrowanie projektów (strona główna) ----- */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.card');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');

      filters.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });

      cards.forEach(function (card) {
        var match = value === 'all' || card.getAttribute('data-category') === value;
        card.hidden = !match;
      });
    });
  });

  /* ----- Adres e-mail składany w przeglądarce (nie występuje w HTML jako gotowy tekst) ----- */
  document.querySelectorAll('[data-user][data-domain]').forEach(function (a) {
    a.href = 'mailto:' + a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
  });

  /* ----- Powiększanie obrazów (lightbox) ----- */
  var dialog = null;

  function buildDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML =
      '<button class="lightbox__close" type="button">&#10005;</button>' +
      '<img alt="">' +
      '<p class="lightbox__caption"></p>';
    document.body.appendChild(dialog);
    dialog.addEventListener('click', function () { dialog.close(); });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a.shot__link') : null;
    if (!link || typeof HTMLDialogElement === 'undefined') return; /* bez wsparcia – zwykły link do obrazu */

    e.preventDefault();
    if (!dialog) buildDialog();

    var thumb = link.querySelector('img');
    var figure = link.closest('figure, .cert');
    var caption = figure ? figure.querySelector('figcaption, .cert__title') : null;

    dialog.querySelector('img').src = link.getAttribute('href');
    dialog.querySelector('img').alt = thumb ? thumb.alt : '';
    dialog.querySelector('.lightbox__caption').textContent = caption ? caption.textContent : '';
    dialog.querySelector('.lightbox__close').setAttribute('aria-label', root.lang === 'pl' ? 'Zamknij' : 'Close');
    dialog.showModal();
  });

  /* ----- Animacja pojawiania przy przewijaniu ----- */
  var items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
