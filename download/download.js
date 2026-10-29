document.querySelectorAll('.dl-lang a').forEach(function (a) { a.href += location.search; });
(function () {
  var hero = document.querySelector('.dl-hero');
  var cover = document.querySelector('.dl-cover img');
  var bg = document.querySelector('.dl-hero .bg');
  if (!hero || !cover || !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var frame = 0, x = 0, y = 0;
  function apply() {
    frame = 0;
    cover.style.transform = 'translate3d(' + (-x * 10).toFixed(1) + 'px,' + (-y * 7).toFixed(1) + 'px,0)';
    bg.style.transform = 'translate3d(' + (x * 6).toFixed(1) + 'px,' + (y * 4).toFixed(1) + 'px,0)';
  }
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    x = (e.clientX - r.left) / r.width - 0.5;
    y = (e.clientY - r.top) / r.height - 0.5;
    if (!frame) frame = requestAnimationFrame(apply);
  });
  hero.addEventListener('pointerleave', function () {
    x = 0; y = 0;
    if (!frame) frame = requestAnimationFrame(apply);
  });
})();
