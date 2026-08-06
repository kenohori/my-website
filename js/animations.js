(function () {
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var duration = 0.6;
  var distance = 24;
  var easing = 'power2.out';

  document.querySelectorAll('[data-hero]').forEach(function (el, i) {
    gsap.from(el, {
      opacity: 0,
      y: distance + 8,
      duration: duration + 0.15,
      delay: i * 0.12,
      ease: easing
    });
  });

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    var vars = {
      opacity: 0,
      duration: duration,
      ease: easing,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    };
    if (el.tagName !== 'TR') {
      vars.y = distance;
    }
    gsap.from(el, vars);
  });

  document.querySelectorAll('.filteredgroup').forEach(function (group) {
    var entries = group.querySelectorAll(':scope > .filteredelement');
    if (!entries.length) {
      return;
    }
    gsap.from(entries, {
      opacity: 0,
      y: distance,
      duration: 0.5,
      ease: easing,
      stagger: 0.06,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true }
    });
  });

  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
