// GG-Sec main.js — 主题切换 / 代码复制 / 快捷键
(function () {
  // ---- 主题切换 ----
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

  // ---- 代码块复制 ----
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

  // ---- 搜索快捷键 Ctrl+K 或 / ----
  var searchToggle = document.getElementById('search-toggle');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchClose = document.getElementById('search-close');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
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
    if (e.key === 'Escape') closeSearch();
  });
  if (searchOverlay) searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) closeSearch();
  });
})();
