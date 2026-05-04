(function () {
  var STORAGE_KEY = 'site-lang';
  var SUPPORTED = ['en', 'zh'];

  function pick(el, lang, suffix) {
    var key = lang + (suffix || '');
    var datasetKey = key.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
    return el.dataset[datasetKey];
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

    document.querySelectorAll('[data-en], [data-zh], [data-en-html], [data-zh-html]').forEach(function (el) {
      var enHtml = el.dataset.enHtml;
      var zhHtml = el.dataset.zhHtml;
      var enText = el.dataset.en;
      var zhText = el.dataset.zh;

      var preferred = lang === 'zh'
        ? [['html', zhHtml], ['text', zhText], ['html', enHtml], ['text', enText]]
        : [['html', enHtml], ['text', enText], ['html', zhHtml], ['text', zhText]];

      for (var i = 0; i < preferred.length; i++) {
        var kind = preferred[i][0];
        var val = preferred[i][1];
        if (val !== undefined) {
          if (kind === 'html') el.innerHTML = val; else el.textContent = val;
          break;
        }
      }
    });

    document.querySelectorAll('[data-en-aria], [data-zh-aria]').forEach(function (el) {
      var v = lang === 'zh' ? (el.dataset.zhAria || el.dataset.enAria) : (el.dataset.enAria || el.dataset.zhAria);
      if (v !== undefined) el.setAttribute('aria-label', v);
    });

    document.querySelectorAll('[data-en-placeholder], [data-zh-placeholder]').forEach(function (el) {
      var v = lang === 'zh' ? (el.dataset.zhPlaceholder || el.dataset.enPlaceholder) : (el.dataset.enPlaceholder || el.dataset.zhPlaceholder);
      if (v !== undefined) el.setAttribute('placeholder', v);
    });

    document.querySelectorAll('[data-en-title], [data-zh-title]').forEach(function (el) {
      var v = lang === 'zh' ? (el.dataset.zhTitle || el.dataset.enTitle) : (el.dataset.enTitle || el.dataset.zhTitle);
      if (v !== undefined) document.title = v;
    });

    document.querySelectorAll('.lang-toggle [data-lang]').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function init() {
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!stored) {
      var nav = (navigator.language || '').toLowerCase();
      stored = nav.indexOf('zh') === 0 ? 'zh' : 'en';
    }
    applyLang(stored);

    document.querySelectorAll('.lang-toggle [data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.dataset.lang); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.setSiteLang = applyLang;
})();
