const observerOptions = {
    root: null,
    threshold: 0, 
    rootMargin: '-150px 0px -150px 0px' 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.classList.remove('is-hidden-top', 'is-hidden-bottom');
      } else {
        const rect = entry.boundingClientRect;
        if (rect.top < 200) { 
          entry.target.classList.add('is-hidden-top');
          entry.target.classList.remove('is-visible');
        } else {
          entry.target.classList.add('is-hidden-bottom');
          entry.target.classList.remove('is-visible');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.bento-item-anim').forEach(item => observer.observe(item));