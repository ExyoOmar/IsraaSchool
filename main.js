document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     1. Smooth Scroll for Navbar Links
  ========================= */
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =========================
     2. Scroll Animation for Sections
  ========================= */
  const animatedSections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }, { threshold: 0.2 });

  animatedSections.forEach(section => {
    section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
    observer.observe(section);
  });

  /* =========================
     3. Hero Button Hover Effect
  ========================= */
  const heroBtn = document.querySelector('.btn-primary');
  heroBtn.addEventListener('mouseenter', () => heroBtn.classList.add('scale-105'));
  heroBtn.addEventListener('mouseleave', () => heroBtn.classList.remove('scale-105'));

  /* =========================
     4. Navbar Shadow on Scroll
  ========================= */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-lg', 'backdrop-blur-md');
    } else {
      header.classList.remove('shadow-lg', 'backdrop-blur-md');
    }
  });

  /* =========================
     5. Lazy Loading Images
  ========================= */
  const lazyImages = document.querySelectorAll('img');
  lazyImages.forEach(img => {
    img.loading = 'lazy';
  });

  /* =========================
     6. Stats Counter Animation
  ========================= */
  const counters = document.querySelectorAll('#stats h3');
  const speed = 200; // lower is faster

  const countUp = (el) => {
    const target = +el.textContent.replace(/\D/g,''); // remove non-digits
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        el.textContent = Math.ceil(count) + el.textContent.replace(/\d/g,'');
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target + el.textContent.replace(/\d/g,'');
      }
    };
    updateCount();
  };

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => statsObserver.observe(counter));

  /* =========================
     7. Mobile Navbar Toggle
  ========================= */
  const nav = document.querySelector('nav');
  const menuBtn = document.createElement('button');
  menuBtn.className = 'md:hidden text-white text-2xl';
  menuBtn.innerHTML = '<i class="fa fa-bars"></i>';
  header.querySelector('div').appendChild(menuBtn);

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
    nav.classList.toggle('flex-col');
    nav.classList.toggle('space-y-4');
    nav.classList.toggle('rtl:space-y-reverse');
    nav.classList.toggle('p-4');
  });

});