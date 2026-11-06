/* Executado antes dos estilos para aplicar a preferência sem piscar o tema. */
(() => {
  let theme;
  let language = 'pt';
  try {
    const storedTheme = localStorage.getItem('rp-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') theme = storedTheme;
    if (localStorage.getItem('rp-language') === 'en') language = 'en';
  } catch { /* A página também funciona quando o armazenamento está bloqueado. */ }
  theme ||= matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0e1116' : '#f4f6ef';
})();
