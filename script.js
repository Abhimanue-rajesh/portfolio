/**
 * Abhimanue R — Portfolio Scripts
 * Mobile menu, scroll effects, AOS init, active nav, back-to-top
 */

(function () {
  'use strict';

  /* ---------- DOM Elements ---------- */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTop = document.getElementById('back-to-top');
  const footerYear = document.getElementById('footer-year');
  const contactForm = document.getElementById('contact-form');

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  /* ---------- Footer Year ---------- */
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ---------- AOS Init ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }

  /* ---------- Mobile Menu Toggle ---------- */
  function toggleMenu(forceClose) {
    const isOpen = mobileMenu.classList.contains('open');

    if (forceClose || isOpen) {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      toggleMenu();
    });
  }

  /* Close mobile menu on nav link click */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(true);
    });
  });

  /* Close mobile menu on outside click */
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      toggleMenu(true);
    }
  });

  /* Close mobile menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  /* ---------- Navbar Scroll Effect ---------- */
  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Active Nav Link Highlighting ---------- */
  function setActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();

  /* ---------- Back to Top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ---------- Contact Form (Static Site Placeholder) ---------- */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const action = contactForm.getAttribute('action');

      if (!action || action === '#') {
        e.preventDefault();
        alert(
          'This form needs a backend service to send emails.\n\n' +
          'To enable it, sign up at https://formspree.io and replace the form action with your endpoint:\n' +
          'action="https://formspree.io/f/YOUR_FORM_ID"'
        );
      }
    });
  }

  /* ---------- Resize: Close mobile menu on desktop breakpoint ---------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });
})();
