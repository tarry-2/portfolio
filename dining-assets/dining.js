(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduce.matches;
  const sync = () => {
    root.classList.toggle('motion-paused', paused);
    toggle.textContent = paused ? '움직임 재생 ↗' : '움직임 멈춤 Ⅱ';
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) { root.style.setProperty('--mx', '0px'); root.style.setProperty('--my', '0px'); }
  };
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduce.addEventListener('change', () => { paused = reduce.matches; sync(); });
  sync();
  const hero = document.querySelector('.hero');
  hero.addEventListener('pointermove', e => {
    if (paused || reduce.matches || e.pointerType !== 'mouse') return;
    const r = hero.getBoundingClientRect();
    root.style.setProperty('--mx', `${((e.clientX-r.left)/r.width-.5)*14}px`);
    root.style.setProperty('--my', `${((e.clientY-r.top)/r.height-.5)*10}px`);
  }, {passive:true});
  hero.addEventListener('pointerleave', () => {
    root.style.setProperty('--mx','0px');root.style.setProperty('--my','0px');
  });
})();
