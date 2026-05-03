document.addEventListener('DOMContentLoaded', () => {
  // --- CUSTOM CURSOR ---
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    document.addEventListener('mousedown', () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
    });

    document.addEventListener('mouseup', () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    });

    // Hover effect for buttons and links
    const links = document.querySelectorAll('a, button, .plan-card, .po-check');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(cursor, { 
          scale: 3, 
          backgroundColor: 'transparent', 
          border: '1px solid var(--gold)',
          duration: 0.3 
        });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: 'var(--gold)', 
          border: 'none',
          duration: 0.3 
        });
      });
    });
  }

  // --- MAGNETIC BUTTONS ---
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // --- HERO ANIMATIONS ---
  const tl = gsap.timeline();
  tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' })
    .from('.split-text', { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }, '-=0.4')
    .from('.hero p', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-actions', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-stats', { opacity: 0, scale: 0.9, duration: 1, ease: 'back.out(1.7)' }, '-=0.4');

  // --- STATS COUNTER ---
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const isPercent = stat.textContent.includes('%');
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      onEnter: () => {
        let obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            stat.textContent = Math.floor(obj.value) + (isPercent ? '%' : '+');
          }
        });
      }
    });
  });

  // --- NAV SCROLL EFFECT ---
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- SECTION REVEALS ---
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  });
});

// --- SUCCESS CONFETTI ---
function fireConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#C9A84C', '#F0D080', '#FFFFFF']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#C9A84C', '#F0D080', '#FFFFFF']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
