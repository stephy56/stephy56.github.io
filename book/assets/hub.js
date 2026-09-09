(function () {
  var reader = document.getElementById('reader');
  var nav = document.getElementById('dayList');

  fetch('data/reviews.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (DATA) {
      var days = (DATA.days || []).slice().sort(function (a, b) { return a.day - b.day; });
      var total = DATA.total_slides || 1851;
      var done = days.length ? Math.max.apply(null, days.map(function (d) { return d.end; })) : 0;
      var pct = Math.round(done / total * 1000) / 10;

      document.getElementById('slidesDone').textContent = done;
      document.getElementById('totalSlides').textContent = total;
      document.getElementById('daysDone').textContent = days.length;
      document.getElementById('pctVal').textContent = pct;
      document.getElementById('barFill').style.width = Math.max(pct, 0.4) + '%';

      if (!days.length) {
        reader.innerHTML = '<p style="color:var(--soft);padding:24px">尚未有導讀內容。</p>';
        return;
      }

      function render(day) {
        var d = days.find(function (x) { return x.day === day; });
        if (!d) return;
        reader.innerHTML =
          '<div class="rhead">' +
            '<div class="kicker">每 日 導 讀 · DAY ' + d.day + '</div>' +
            '<h1>' + d.theme + '</h1>' +
            '<div class="sub">投影片 ' + d.start + '–' + d.end + ' / ' + total + '　·　' + d.date + '</div>' +
          '</div>' + d.fragment +
          '<div class="rfoot">《萬有引力與信念創造實相》每日導讀 · Day ' + d.day +
          '（投影片 ' + d.start + '–' + d.end + '）</div>';
        window.scrollTo(0, 0);
        var kids = nav.children;
        for (var i = 0; i < kids.length; i++) {
          kids[i].classList.toggle('active', +kids[i].dataset.day === day);
        }
        if (history.replaceState) history.replaceState(null, '', '#day-' + day);
      }

      days.slice().reverse().forEach(function (d) {
        var b = document.createElement('button');
        b.className = 'daybtn'; b.dataset.day = d.day;
        b.innerHTML = '<div class="d">DAY ' + d.day + '</div><div class="t">' + d.theme + '</div>' +
          '<div class="m">投影片 ' + d.start + '–' + d.end + '　·　' + d.date + '</div>';
        b.onclick = function () { render(d.day); };
        nav.appendChild(b);
      });

      var m = (location.hash.match(/day-(\d+)/) || [])[1];
      var startDay = m ? +m : days[days.length - 1].day;
      if (!days.find(function (x) { return x.day === startDay; })) startDay = days[days.length - 1].day;
      render(startDay);
    })
    .catch(function (e) {
      reader.innerHTML = '<p style="color:var(--soft);padding:24px">無法載入導讀資料（data/reviews.json）。' +
        '若在本機直接開啟檔案，請改用網站網址開啟。</p>';
    });
})();
