(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (reduce || coarse) return;

  var canvas = document.getElementById('fx-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function burst(x, y) {
    var n = 16;
    for (var i = 0; i < n; i++) {
      var ang = (Math.PI * 2 * i) / n + Math.random() * 0.3;
      var sp = 1.6 + Math.random() * 3.2;
      particles.push({
        x: x, y: y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        r: 1.4 + Math.random() * 2.2,
        a: 1,
        life: 1,
        c: i % 2 ? '0,229,160' : '0,184,255'
      });
    }
    for (var j = 0; j < 8; j++) {
      particles.push({
        x: x, y: y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -1.2 - Math.random() * 2.4,
        r: 1.1,
        a: 0.9,
        life: 1,
        c: '199,146,234'
      });
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('input, textarea, .codeblock-copy')) return;
    burst(e.clientX, e.clientY);
  });

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var k = particles.length - 1; k >= 0; k--) {
      var p = particles[k];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.life -= 0.02;
      p.a *= 0.96;
      if (p.life <= 0) { particles.splice(k, 1); continue; }
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
