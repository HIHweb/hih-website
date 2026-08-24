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

// ---------- Contact form ----------
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const note = form.querySelector('.form-note');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (note) {
      note.textContent = "Thanks for reaching out — we'll get back to you soon. (Note: connect this form to Formspree or a similar service to enable real email delivery.)";
    }
    form.reset();
  });
})();

// ---------- Newsletter (footer) ----------
(function () {
  const btn = document.getElementById('newsletterBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    const input = document.getElementById('newsletter');
    if (input && input.value) {
      alert('Thanks for subscribing! (Connect this to Mailchimp, Buttondown, or a similar service to enable real signups.)');
      input.value = '';
    }
  });
})();

// ---------- Footer year ----------
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
