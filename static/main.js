// ── NAVBAR SCROLL ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── HAMBURGER MENU ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ── BANNER SLIDER ───────────────────────────────────────────────
(function initBannerSlider() {
  const slider      = document.getElementById('bannerSlider');
  if (!slider) return;

  const slides      = slider.querySelectorAll('.banner-slide');
  const dots        = slider.querySelectorAll('.banner-dot');
  const prevBtn     = document.getElementById('bannerPrev');
  const nextBtn     = document.getElementById('bannerNext');
  const progressBar = document.getElementById('bannerProgressBar');

  if (!slides.length) return;

  let current      = 0;
  let autoTimer    = null;
  let progressTimer= null;
  const DURATION   = 5000; // 5 seconds per slide
  let isPaused     = false;
  let touchStartX  = 0;
  let touchEndX    = 0;

  // ── Go to slide ─────────────────────────────────────────────
  function goTo(index) {
    if (index === current) return;

    // Remove active from current
    slides[current].classList.remove('active');
    slides[current].classList.add('prev');
    dots[current]?.classList.remove('active');

    // Clean up prev class after transition
    const oldSlide = slides[current];
    setTimeout(() => { oldSlide.classList.remove('prev'); }, 1000);

    // Set new current
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');

    // Restart progress bar
    resetProgress();
  }

  // ── Next / Prev ─────────────────────────────────────────────
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ── Auto-play ────────────────────────────────────────────────
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!isPaused) next();
    }, DURATION);
  }

  function stopAuto() { clearInterval(autoTimer); }

  // ── Progress bar ─────────────────────────────────────────────
  function resetProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth; // reflow
    progressBar.style.transition = `width ${DURATION}ms linear`;
    progressBar.style.width = '100%';
  }

  // ── Event listeners ──────────────────────────────────────────
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // ── Pause on hover ────────────────────────────────────────────
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
    if (progressBar) progressBar.style.animationPlayState = 'paused';
  });
  slider.addEventListener('mouseleave', () => {
    isPaused = false;
    if (progressBar) progressBar.style.animationPlayState = 'running';
  });

  // ── Touch / swipe support ─────────────────────────────────────
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    slider.classList.add('is-dragging');
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    slider.classList.remove('is-dragging');
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      startAuto();
    }
  }, { passive: true });

  // ── Keyboard navigation ────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (!slider) return;
    if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
    if (e.key === 'ArrowRight') { next(); startAuto(); }
  });

  // ── Init ──────────────────────────────────────────────────────
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  startAuto();
  resetProgress();

})();

// ── COUNTER ANIMATION ──────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── SCROLL ANIMATIONS ──────────────────────────────────────────
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => {
  el.classList.add('animate-init');
  animateObserver.observe(el);
});

// ── CONTACT FORM ───────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      formSuccess.style.display = 'flex';
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      contactForm.reset();
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1200);
  });
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── ADD CSS FOR ANIMATIONS ─────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .animate-init {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animate-init.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
`;
document.head.appendChild(style);
