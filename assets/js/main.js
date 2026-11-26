// ---------- Mobile menu ----------
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link is tapped (mobile)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ---------- Animated counters (hero stat + impact stats) ----------
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });
})();

// ---------- Forms (Netlify Forms) ----------
(function () {
  function wire(form, note, okMsg) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (r) {
        if (!r.ok) throw new Error('fail');
        if (note) note.textContent = okMsg;
        form.reset();
      }).catch(function () {
        if (note) note.textContent = 'Sorry, that could not be sent. Please email info@holisticimpacthub.org.';
      }).then(function () { if (btn) btn.disabled = false; });
    });
  }
  var cf = document.getElementById('contactForm');
  wire(cf, cf && cf.querySelector('.form-note'), 'Thank you. Your message has been sent and we will reply soon.');
  wire(document.getElementById('newsletterForm'), document.getElementById('newsletterNote'), 'Thank you for subscribing.');
})();

// ---------- Footer year ----------
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
