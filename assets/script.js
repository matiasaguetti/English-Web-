// assets/script.js — Interacciones: menú, filtros y animaciones por scroll
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MENU MÓVIL ---------- */
  var btn = document.getElementById('btn-menu');
  var nav = document.getElementById('nav');
  if (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav.style.display === 'block') { nav.style.display = ''; }
      else { nav.style.display = 'block'; }
    });
  }

  /* ---------- FILTROS CATALOGO (SIMPLE) ---------- */
  var reset = document.getElementById('reset-filters');
  if (reset) {
    var nivelSel = document.getElementById('filter-nivel');
    var formatoSel = document.getElementById('filter-formato');

    function filterCatalog() {
      var nivel = nivelSel.value;
      var formato = formatoSel.value;
      var items = document.querySelectorAll('#catalog-list .card');
      items.forEach(function (it) {
        var ok = true;
        if (nivel && it.dataset.nivel !== nivel) ok = false;
        if (formato && it.dataset.formato !== formato) ok = false;
        it.style.display = ok ? '' : 'none';
      });
    }

    reset.addEventListener('click', function () {
      nivelSel.value = '';
      formatoSel.value = '';
      filterCatalog();
    });
    nivelSel.addEventListener('change', filterCatalog);
    formatoSel.addEventListener('change', filterCatalog);
  }

  /* ---------- INTERSECTION OBSERVER: reveal on scroll ---------- */
  // seleccionar nodos que queremos animar
  var animatedNodes = [].slice.call(document.querySelectorAll('.animate, .card, .section, .hero-copy, .testimonials, .post-card, .course-preview'));

  // si el usuario prefiere reducir motion, no instanciamos observer
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window && animatedNodes.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview');
          // una vez visible, dejar de observar para ahorrar recursos
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    animatedNodes.forEach(function (n) {
      // añade clase base si no existe
      if (!n.classList.contains('animate')) n.classList.add('animate');
      io.observe(n);
    });
  } else {
    // si reduce-motion o no soporta, añadir clase inview directamente
    animatedNodes.forEach(function (n) { n.classList.add('inview'); });
  }

  /* ---------- CTA pulse enhancer (adds .pulse to main CTAs) ---------- */
  var ctas = document.querySelectorAll('.btn-primary');
  if (ctas.length) {
    // añadir pulse solo a primeras 2 CTAs para no sobrecargar
    for (var i = 0; i < Math.min(2, ctas.length); i++) {
      ctas[i].classList.add('pulse');
    }
  }

  /* ---------- simple form submit feedback (contact) ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Dejamos que Formspree u otro maneje el post; mostramos micro-feedback
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.setAttribute('disabled', 'disabled');
        var old = btn.innerHTML;
        btn.innerHTML = 'Enviando...';
        setTimeout(function () {
          btn.removeAttribute('disabled');
          btn.innerHTML = old;
        }, 3500);
      }
    });
  }

});
