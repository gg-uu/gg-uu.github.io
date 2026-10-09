(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem('gg-sec-theme');
  if (stored) root.setAttribute('data-theme', stored);

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('gg-sec-theme', next);
    });
  }

  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var header = document.getElementById('site-header');
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY || 0;
    if (header) {
      if (y > 80 && y > lastY) header.classList.add('header-hide');
      else header.classList.remove('header-hide');
    }
    lastY = y;
    var topBtn = document.getElementById('back-top');
    if (topBtn) topBtn.hidden = y < 400;
  }, { passive: true });

  var topBtn = document.getElementById('back-top');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.codeblock-copy');
    if (!btn) return;
    var codeblock = btn.closest('.codeblock');
    if (!codeblock) return;
    var pre = codeblock.querySelector('pre');
    if (!pre) return;
    var text = pre.innerText || pre.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = '复制'; }, 1500);
      });
    }
  });

  var searchToggle = document.getElementById('search-toggle');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchClose = document.getElementById('search-close');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
    document.body.classList.remove('nav-open');
    if (searchInput) setTimeout(function () { searchInput.focus(); }, 30);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = true;
  }
  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); openSearch(); }
    if (e.key === '/') {
      var t = e.target;
      var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA');
      if (!typing) { e.preventDefault(); openSearch(); }
    }
    if (e.key === 'Escape') {
      closeSearch();
      document.body.classList.remove('nav-open');
    }
  });
  if (searchOverlay) searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) closeSearch();
  });

  var runtimeEl = document.getElementById('site-runtime');
  if (runtimeEl) {
    var since = runtimeEl.getAttribute('data-since') || '2026-01-01';
    function tick() {
      var start = new Date(since + 'T00:00:00');
      var now = new Date();
      var ms = Math.max(0, now - start);
      var d = Math.floor(ms / 86400000);
      var h = Math.floor((ms % 86400000) / 3600000);
      var m = Math.floor((ms % 3600000) / 60000);
      runtimeEl.textContent = d + ' 天 ' + h + ' 时 ' + m + ' 分';
    }
    tick();
    setInterval(tick, 60000);
  }

  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    var ids = [];
    tocLinks.forEach(function (a) {
      var id = decodeURIComponent((a.getAttribute('href') || '').replace('#', ''));
      if (id) ids.push(id);
    });
    function markToc() {
      var current = ids[0];
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top < 120) current = ids[i];
      }
      tocLinks.forEach(function (a) {
        var id = decodeURIComponent((a.getAttribute('href') || '').replace('#', ''));
        a.classList.toggle('active', id === current);
      });
    }
    window.addEventListener('scroll', markToc, { passive: true });
    markToc();
  }
})();
