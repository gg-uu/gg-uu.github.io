(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var overlay = document.getElementById('search-overlay');
  if (!input || !results) return;
  var fuse = null;
  var indexUrl = (overlay && overlay.getAttribute('data-index')) || '/index.json';

  fetch(indexUrl, { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      fuse = new Fuse(data, {
        keys: ['title', 'content', 'summary', 'tags', 'categories', 'series'],
        threshold: 0.35,
        ignoreLocation: true,
        includeScore: true
      });
    })
    .catch(function () {});

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
      var cat = (d.categories && d.categories[0]) ? d.categories[0] : '';
      li.innerHTML =
        '<a href="' + d.url + '">' +
          '<div class="sr-meta">' + (d.date || '') + (cat ? ' · ' + cat : '') + (tags ? ' · ' + tags : '') + '</div>' +
          '<div class="sr-title">' + d.title + '</div>' +
          '<div class="sr-snippet">' + (d.summary || '') + '</div>' +
        '</a>';
      results.appendChild(li);
    });
  }

  input.addEventListener('input', function () {
    var q = input.value.trim();
    if (!fuse || !q) { results.innerHTML = ''; return; }
    render(fuse.search(q).slice(0, 20));
  });

  results.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a && overlay) overlay.hidden = true;
  });
})();
