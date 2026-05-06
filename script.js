const WA_NUMBER = '6287886555808';
  const WA_MESSAGE = 'Halo saya tertarik membeli cookie dari I Made It Cookie';
  // =============================================

  function orderWA() {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
    window.open(url, '_blank');
  }

  const scroller = document.getElementById('scroller');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const progress = document.getElementById('progress');
  const hint = document.getElementById('hint');

  function setActive(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    progress.style.width = ((idx + 1) / slides.length * 100) + '%';
    hint.style.opacity = idx === 0 ? '1' : '0';
  }

  // Detect active slide on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio >= 0.55) {
        setActive(parseInt(e.target.dataset.index));
      }
    });
  }, { root: scroller, threshold: 0.55 });

  slides.forEach(s => observer.observe(s));

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.target);
      slides[target].scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Subtle parallax on background images
  scroller.addEventListener('scroll', () => {
    const scrollTop = scroller.scrollTop;
    const viewH = window.innerHeight;

    slides.forEach((slide, i) => {
      const bg = slide.querySelector('.slide-bg');
      if (!bg) return;
      const offset = scrollTop - i * viewH;
      bg.style.transform = `translateY(${offset * 0.18}px)`;
    });
  }, { passive: true });

  setActive(0);