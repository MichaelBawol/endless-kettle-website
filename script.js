/* ═══════════════════════════════════════════════════════
   THE ENDLESS KETTLE — Scripts
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL EFFECT ──────────────────────────────
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── MOBILE MENU TOGGLE ────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click (skip dropdown toggle)
  navLinks.querySelectorAll('a').forEach(link => {
    if (link.classList.contains('nav__dropdown-toggle')) return;
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── NAV DROPDOWN (click to toggle on mobile + touch) ──
  const dropdownToggle = document.querySelector('.nav__dropdown-toggle');
  const dropdown = document.querySelector('.nav__dropdown');

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('nav__dropdown--open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('nav__dropdown--open');
      }
    });
  }


  // ── REVEAL ON SCROLL (Intersection Observer) ──────────
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling reveals
          const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
          const index = Array.from(siblings).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ── MENU TABS ─────────────────────────────────────────
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('menu__tab--active'));
      tab.classList.add('menu__tab--active');

      panels.forEach(panel => {
        panel.classList.remove('menu__panel--active');
        if (panel.id === `panel-${target}`) {
          panel.classList.add('menu__panel--active');
          // Re-reveal cards in the new panel
          panel.querySelectorAll('[data-reveal]').forEach((el, i) => {
            el.classList.remove('revealed');
            setTimeout(() => el.classList.add('revealed'), i * 80);
          });
        }
      });
    });
  });

  // ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────────
  const sections = document.querySelectorAll('.section');
  const navLinksAll = document.querySelectorAll('.nav__links a:not(.nav__cta)');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinksAll.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // ── SMOOTH SCROLL (fallback for older browsers) ───────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
