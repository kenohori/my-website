(function () {
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var duration = 0.6;
  var distance = 24;
  var easing = 'power2.out';

  var navbar = document.querySelector('.navbar');
  if (navbar) {
    gsap.from(navbar, {
      y: -24,
      opacity: 0,
      duration: 0.5,
      ease: easing
    });
  }

  var heroEls = document.querySelectorAll('[data-hero]');
  if (heroEls.length) {
    gsap.from(heroEls, {
      autoAlpha: 0,
      y: distance + 8,
      scale: 0.98,
      duration: duration + 0.15,
      stagger: 0.12,
      ease: easing
    });
  }

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    var vars = {
      autoAlpha: 0,
      duration: duration,
      ease: easing,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    };
    if (el.tagName !== 'TR') {
      vars.y = distance;
    }
    gsap.from(el, vars);
  });

  document.querySelectorAll('[data-parallax]').forEach(function (el) {
    var trigger = el.closest('[data-hero]') || el.parentElement;
    if (!trigger) {
      return;
    }
    gsap.fromTo(el,
      { yPercent: 0, scale: 1.12 },
      {
        yPercent: 10,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: trigger, start: 'top top', end: 'bottom top', scrub: true }
      }
    );
  });

  document.querySelectorAll('[data-line]').forEach(function (el) {
    gsap.fromTo(el,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: duration,
        ease: easing,
        scrollTrigger: { trigger: el, start: 'top 95%', once: true }
      }
    );
  });

  document.querySelectorAll('.filteredgroup').forEach(function (group) {
    var entries = group.querySelectorAll(':scope > .filteredelement');
    if (!entries.length) {
      return;
    }
    gsap.from(entries, {
      autoAlpha: 0,
      y: distance,
      duration: 0.5,
      ease: easing,
      stagger: 0.06,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true }
    });
  });

  var postContent = document.querySelector('.post-content');
  if (postContent) {
    postContent.querySelectorAll('img, h2, h3, blockquote, pre').forEach(function (el) {
      gsap.from(el, {
        autoAlpha: 0,
        y: el.tagName === 'IMG' ? 16 : 20,
        scale: el.tagName === 'IMG' ? 1.05 : 1,
        duration: duration,
        ease: easing,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    });
  }

  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
