/* Enxame compartilhado pelos dois layouts, sem dependências. */
(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 600px), (pointer: coarse)');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.className = 'swarm-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'swarm-toggle';
  toggle.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><circle cx="4" cy="7" r="1.5"/><circle cx="10" cy="4" r="1.5"/><circle cx="15" cy="8" r="2"/><circle cx="7" cy="13" r="2"/><circle cx="14" cy="15" r="1.5"/></svg><span></span>';
  document.body.append(canvas, toggle);
  let enabled = true;
  try { enabled = localStorage.getItem('rp-swarm') !== 'off'; } catch { /* Optional persistence. */ }
  let width = 0, height = 0, particles = [], frame = 0, last = 0, phase = 0;
  let color, opacity;
  const pointer = { x: 0, y: 0, active: false, moved: 0 };

  function appearance() {
    color = getComputedStyle(root).getPropertyValue('--blue').trim() || '#557300';
    opacity = root.dataset.theme === 'dark' ? .52 : .34;
    const en = root.dataset.language === 'en';
    toggle.querySelector('span').textContent = en ? 'Swarm' : 'Enxame';
    toggle.setAttribute('aria-label', en ? 'Swarm effect' : 'Efeito de enxame');
    toggle.title = en ? (enabled ? 'Pause swarm' : 'Enable swarm') : (enabled ? 'Pausar enxame' : 'Ativar enxame');
    toggle.setAttribute('aria-pressed', String(enabled));
  }

  function resize() {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = compact.matches ? 24 : 48;
    particles = Array.from({ length: count }, (_, i) => {
      const angle = i / count * Math.PI * 2;
      const radius = 25 + Math.random() * 90;
      return { x: width * .78 + Math.cos(angle) * radius, y: height * .38 + Math.sin(angle) * radius,
        vx: -Math.sin(angle), vy: Math.cos(angle), size: .9 + Math.random() * 1.1, trail: [] };
    });
  }

  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (now - last < 1000 / 30) return;
    const step = Math.min((now - last) / 16.667, 2.5);
    last = now;
    phase += step * .005;
    const following = pointer.active && now - pointer.moved < 3500;
    const tx = following ? pointer.x : width * (.72 + Math.sin(phase * .7) * .12);
    const ty = following ? pointer.y : height * (.36 + Math.cos(phase) * .16);
    const radius = compact.matches ? 48 : 76;
    // Calculate every force from the same frame, then move the entire flock.
    const forces = particles.map(p => {
      let sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, neighbors = 0;
      for (const other of particles) {
        if (p === other) continue;
        const dx = p.x - other.x, dy = p.y - other.y;
        const distance2 = dx * dx + dy * dy;
        if (distance2 < 900 && distance2 > .01) { sx += dx / distance2; sy += dy / distance2; }
        if (distance2 < 6400) { ax += other.vx; ay += other.vy; cx += other.x; cy += other.y; neighbors++; }
      }
      const dx = tx - p.x, dy = ty - p.y, distance = Math.max(1, Math.hypot(dx, dy));
      const attraction = (distance - radius) * .0013;
      let fx = dx / distance * attraction - dy / distance * .045 + sx * .65;
      let fy = dy / distance * attraction + dx / distance * .045 + sy * .65;
      if (neighbors) {
        fx += (ax / neighbors - p.vx) * .018 + (cx / neighbors - p.x) * .00018;
        fy += (ay / neighbors - p.vy) * .018 + (cy / neighbors - p.y) * .00018;
      }
      // Soft boundaries avoid particles sticking to viewport edges.
      fx += p.x < 16 ? .12 : p.x > width - 16 ? -.12 : 0;
      fy += p.y < 16 ? .12 : p.y > height - 16 ? -.12 : 0;
      return { x: fx, y: fy };
    });
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    particles.forEach((p, i) => {
      p.vx += forces[i].x * step;
      p.vy += forces[i].y * step;
      const speed = Math.hypot(p.vx, p.vy);
      const limit = following ? 3.1 : 1.7;
      if (speed > limit) { p.vx *= limit / speed; p.vy *= limit / speed; }
      p.x += p.vx * step; p.y += p.vy * step;
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 6) p.trail.shift();
      ctx.lineWidth = .7;
      ctx.globalAlpha = opacity * .3;
      ctx.beginPath();
      p.trail.forEach((point, j) => j ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
      ctx.stroke();
      ctx.globalAlpha = opacity;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
  }

  function reconcile() {
    cancelAnimationFrame(frame);
    frame = 0;
    canvas.hidden = !enabled || reducedMotion.matches;
    toggle.hidden = reducedMotion.matches;
    appearance();
    if (canvas.hidden || document.hidden) { ctx.clearRect(0, 0, width, height); return; }
    last = performance.now();
    frame = requestAnimationFrame(draw);
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem('rp-swarm', enabled ? 'on' : 'off'); } catch { /* Works without storage. */ }
    reconcile();
  });
  window.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    pointer.x = event.clientX; pointer.y = event.clientY;
    pointer.active = true; pointer.moved = performance.now();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer.active = false; });
  window.addEventListener('blur', () => { pointer.active = false; });
  window.addEventListener('resize', resize, { passive: true });
  compact.addEventListener('change', resize);
  reducedMotion.addEventListener('change', reconcile);
  document.addEventListener('visibilitychange', reconcile);
  window.addEventListener('storage', event => {
    if (event.key === 'rp-swarm' || event.key === null) {
      enabled = event.newValue !== 'off';
      reconcile();
    }
  });
  new MutationObserver(appearance).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-language'] });
  resize();
  reconcile();
})();
