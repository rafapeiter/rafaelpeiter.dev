/* Os dois layouts compartilham preferências e conservam a seção ao alternar. */
(() => {
  const current = /\/v1(?:\/|\/index\.html)?$/.test(location.pathname) ? '1' : '2';
  const url = new URL(location.href);
  const requested = url.searchParams.get('version');
  let stored;
  try { stored = localStorage.getItem('rp-version'); } catch { /* Sem persistência. */ }
  const desired = ['1', '2'].includes(requested) ? requested : (current === '1' || stored === '1' ? '1' : '2');
  try { localStorage.setItem('rp-version', desired); } catch { /* Mantém a navegação. */ }
  url.searchParams.delete('version');
  if (desired !== current) {
    url.pathname = desired === '1' ? '/v1/' : '/';
    if (desired === '2' && url.hash === '#sobre') url.hash = '#inicio';
    location.replace(url.href);
    return;
  }
  if (requested !== null) history.replaceState(history.state, '', url.href);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-site-version]');
    if (!link) return;
    const version = link.dataset.siteVersion;
    const destination = new URL(link.href);
    destination.hash = version === '2' && location.hash === '#sobre' ? '#inicio' : location.hash;
    link.href = destination.href;
    try { localStorage.setItem('rp-version', version); } catch { /* O link funciona sem armazenamento. */ }
  });
})();
