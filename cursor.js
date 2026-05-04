(function () {
  if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const html = document.documentElement;

  function init() {
    html.classList.add('has-custom-cursor');

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const HOTSPOT = 10;
    const SPLATTER_DISTANCE_SQ = 90 * 90;
    const SPLATTER_LIFETIME = 1500;
    const COLORS = ['#CEB5D4', '#b896c0', '#e1cfe5', '#a989b0', '#d4bcdc'];

    let lastX = -1, lastY = -1;
    let lastSplatX = 0, lastSplatY = 0;
    let visible = false;
    let pendingFrame = null;

    function spawnSplatter(x, y) {
      const cluster = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < cluster; i++) {
        const splat = document.createElement('div');
        splat.className = 'paint-splatter';
        const size = 4 + Math.random() * 6;
        const offX = (Math.random() - 0.5) * 28;
        const offY = (Math.random() - 0.5) * 28;
        splat.style.width = size + 'px';
        splat.style.height = size + 'px';
        splat.style.left = (x + offX - size / 2) + 'px';
        splat.style.top = (y + offY - size / 2) + 'px';
        splat.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
        document.body.appendChild(splat);
        setTimeout(() => splat.remove(), SPLATTER_LIFETIME);
      }
    }

    function update() {
      pendingFrame = null;
      cursor.style.transform = 'translate3d(' + (lastX - HOTSPOT) + 'px,' + (lastY - HOTSPOT) + 'px,0)';
    }

    function onMove(e) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!visible) {
        cursor.classList.add('is-visible');
        visible = true;
        lastSplatX = lastX;
        lastSplatY = lastY;
      } else {
        const dx = lastX - lastSplatX;
        const dy = lastY - lastSplatY;
        if (dx * dx + dy * dy > SPLATTER_DISTANCE_SQ) {
          spawnSplatter(lastX, lastY);
          lastSplatX = lastX;
          lastSplatY = lastY;
        }
      }
      if (pendingFrame === null) pendingFrame = requestAnimationFrame(update);
    }

    function onLeave() {
      cursor.classList.remove('is-visible');
      visible = false;
    }

    function onEnter(e) {
      lastX = e.clientX;
      lastY = e.clientY;
      cursor.classList.add('is-visible');
      visible = true;
      if (pendingFrame === null) pendingFrame = requestAnimationFrame(update);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    window.addEventListener('touchstart', function once() {
      html.classList.remove('has-custom-cursor');
      cursor.remove();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('touchstart', once);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
