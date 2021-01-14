// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

// This initialises the app for development purposes
import initCookieThough from './components/app';
import mockCookies from './tests/__mocks__/cookieOptions';
window.addEventListener('DOMContentLoaded', () => {
  const { setVisible } = initCookieThough({
    cookieOptions: mockCookies,
  });

  window.cookieThough = { setVisible };
  const manageCookiesElement = document.getElementById('manage-cookie-though');
  manageCookiesElement?.addEventListener('click', () => {
    setVisible(true);
  });
});
