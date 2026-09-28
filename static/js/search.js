// GG-Sec search.js — Fuse.js 全文搜索
(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  if (!input || !results) return;
  var fuse = null;

  fetch('/index.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      fuse = new Fuse(data, {
        keys: ['title', 'content', 'summary', 'tags', 'categories'],
        threshold: 0.35,
        ignoreLocation: true,
        includeScore: true
      });
    })
    .catch(function () { /* index 加载失败 */ });

  function render(list) {
    results.innerHTML = '';
    if (!list.length) {
      results.innerHTML = '<li class="search-empty">未找到匹配内容</li>';
      return;
    }
    list.forEach(function (item) {
      var d = item.item;
      var li = document.createElement('li');
      li.className = 'search-result';
      var tags = (d.tags || []).map(function (t) { return '#' + t; }).join(' ');
      li.innerHTML =
        '<a href="' + d.url + '">' +
          '<div class="sr-meta">' + (d.date || '') + (tags ? ' · ' + tags : '') + '</div>' +
          '<div class="sr-title">' + d.title + '</div>' +
          '<div class="sr-snippet">' + (d.summary || '') + '</div>' +
        '</a>';
      results.appendChild(li);
    });
  }

  input.addEventListener('input', function () {
    var q = input.value.trim();
    if (!fuse || !q) { render([]); return; }
    var res = fuse.search(q).slice(0, 20);
    render(res);
  });

  results.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a) {
      var overlay = document.getElementById('search-overlay');
      if (overlay) overlay.hidden = true;
    }
  });
})();
