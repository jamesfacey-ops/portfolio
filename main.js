/* ============================================
   Portfolio — main.js
   ~60 lines, no dependencies
   ============================================ */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav a[href^="#"]');

  // --- Nav: scroll state ---
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // --- Nav: mobile toggle ---
  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mobileNav.hidden) {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !mobileNav.hidden) {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on mobile nav link click
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Active section highlight ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
        });
        var active = document.querySelector('#nav a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) {
    observer.observe(s);
  });

  // --- Contact form ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('cf-submit');
      var status = document.getElementById('cf-status');
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.className = 'form-status form-error';
        status.hidden = false;
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending...';
      status.hidden = true;

      fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, message: message })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.ok) {
            form.reset();
            status.textContent = 'Message sent. I\'ll be in touch.';
            status.className = 'form-status form-success';
          } else {
            status.textContent = 'Something went wrong. Try emailing directly.';
            status.className = 'form-status form-error';
          }
          status.hidden = false;
          btn.disabled = false;
          btn.textContent = 'Send message';
        })
        .catch(function () {
          status.textContent = 'Could not send. Try emailing directly.';
          status.className = 'form-status form-error';
          status.hidden = false;
          btn.disabled = false;
          btn.textContent = 'Send message';
        });
    });
  }

}());
