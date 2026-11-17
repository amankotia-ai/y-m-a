const footer = document.querySelector('.site-footer');
const themeColor = document.querySelector('meta[name="theme-color"]');
const defaultThemeColor = themeColor.content;
const footerThemeColor = getComputedStyle(footer).backgroundColor;
const touchViewport = matchMedia('(pointer: coarse)');
let footerVisible = false;

function updateFooterTheme() {
  const useFooterColor = touchViewport.matches && footerVisible;
  document.documentElement.classList.toggle('footer-in-view', useFooterColor);
  themeColor.content = useFooterColor ? footerThemeColor : defaultThemeColor;
}

const footerObserver = new IntersectionObserver(([entry]) => {
  footerVisible = entry.isIntersecting;
  updateFooterTheme();
});

footerObserver.observe(footer);
touchViewport.addEventListener('change', updateFooterTheme);
