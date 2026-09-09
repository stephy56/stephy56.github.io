(function () {
  var grid = document.getElementById('grid');
  var lbox = document.getElementById('lbox');
  var limg = document.getElementById('limg');
  var lcap = document.getElementById('lcap');
  var cur = 1, total = 1851;

  function pad(n) { return ('0000' + n).slice(-4); }
  function src(n) { return 'slides/slide-' + pad(n) + '.jpg'; }

  function build(t) {
    total = t;
    document.getElementById('count').textContent = total;
    var frag = document.createDocumentFragment();
    for (var i = 1; i <= total; i++) {
      (function (n) {
        var cell = document.createElement('div');
        cell.className = 'gcell';
        var img = document.createElement('img');
        img.loading = 'lazy'; img.decoding = 'async';
        img.src = src(n); img.alt = '投影片 ' + n;
        var lbl = document.createElement('span');
        lbl.className = 'lbl'; lbl.textContent = n;
        cell.appendChild(img); cell.appendChild(lbl);
        cell.onclick = function () { open(n); };
        frag.appendChild(cell);
      })(i);
    }
    grid.appendChild(frag);
  }

  function open(n) { cur = n; limg.src = src(n); lcap.textContent = '投影片 ' + n + ' / ' + total; lbox.classList.add('open'); }
  function close() { lbox.classList.remove('open'); }
  function go(d) { var n = cur + d; if (n >= 1 && n <= total) open(n); }

  document.getElementById('lx').onclick = close;
  document.getElementById('lprev').onclick = function (e) { e.stopPropagation(); go(-1); };
  document.getElementById('lnext').onclick = function (e) { e.stopPropagation(); go(1); };
  lbox.onclick = function (e) { if (e.target === lbox) close(); };
  document.addEventListener('keydown', function (e) {
    if (!lbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });
  // swipe
  var x0 = null;
  lbox.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lbox.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    x0 = null;
  });
  document.getElementById('jump').addEventListener('change', function () {
    var n = parseInt(this.value, 10);
    if (n >= 1 && n <= total) {
      var cells = grid.children;
      if (cells[n - 1]) cells[n - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  function showEmpty(t) {
    document.getElementById('count').textContent = t;
    var tools = document.querySelector('.gtools'); if (tools) tools.style.display = 'none';
    grid.style.display = 'block';
    grid.innerHTML = '<div style="border:1px dashed var(--line);border-radius:14px;padding:40px 28px;' +
      'text-align:center;color:var(--soft);line-height:2;background:var(--card)">' +
      '簡報圖片尚未上傳，所以這裡暫時是空的。<br>' +
      '每日導讀完全不受影響。日後把 ' + t + ' 張投影片放進 <code>book/slides/</code> 後，這一頁就會自動顯示全部投影片。' +
      '</div>';
  }

  function start(t) {
    // Probe the first slide; if images aren't uploaded yet, show a friendly note instead of broken cells.
    var probe = new Image();
    probe.onload = function () { build(t); };
    probe.onerror = function () { showEmpty(t); };
    probe.src = src(1);
  }

  fetch('data/meta.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (m) { start(m.total_slides || 1851); })
    .catch(function () { start(1851); });
})();
