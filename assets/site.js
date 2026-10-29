(function () {
  var de = document.documentElement.lang === 'de' || !!document.querySelector('.lang[aria-label="Sprache"]');

  var toast = document.getElementById('toast'), tt;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('on'); clearTimeout(tt);
    tt = setTimeout(function () { toast.classList.remove('on'); }, 2600);
  }

  document.querySelectorAll('.menu .panel a').forEach(function (a) {
    a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
  });

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.fig .bar').forEach(function (b, i) { b.style.setProperty('--d', i); });
  if ('IntersectionObserver' in window && !calm) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        requestAnimationFrame(function () { requestAnimationFrame(function () { e.target.classList.remove('pre'); }); });
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('.fig').forEach(function (f) {
      if (f.getBoundingClientRect().top > window.innerHeight * 0.85) { f.classList.add('pre'); io.observe(f); }
    });
  }

  var stats = document.querySelector('.stats');
  if (stats && 'IntersectionObserver' in window && !calm) {
    var nums = Array.prototype.slice.call(stats.querySelectorAll('.stat .n')).map(function (n) {
      var t = n.firstChild; return t && t.nodeType === 3 ? { t: t, ziel: parseInt(t.nodeValue, 10) } : null;
    }).filter(function (x) { return x && !isNaN(x.ziel); });
    if (stats.getBoundingClientRect().top > window.innerHeight * 0.9) {
      nums.forEach(function (x) { x.t.nodeValue = '0'; });
      var zaehle = function (x, verz) {
        var dauer = 1300, start = null;
        setTimeout(function () {
          requestAnimationFrame(function schritt(ts) {
            if (start === null) start = ts;
            var f = Math.min(1, (ts - start) / dauer), e = 1 - Math.pow(1 - f, 3);
            x.t.nodeValue = String(Math.round(x.ziel * e));
            if (f < 1) requestAnimationFrame(schritt);
          });
        }, verz);
      };
      var so = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        so.disconnect();
        nums.forEach(function (x, i) { zaehle(x, i * 220); });
      }, { threshold: 0.4 });
      so.observe(stats);
    }
  }

})();
