import englishMockConfig, { dutchMockConfig } from './tests/__mocks__/config';
// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

// This initialises the app for development purposes
// import CookieThough from '../dist/app';
import CookieThough from './components/app';
window.addEventListener('DOMContentLoaded', () => {
  CookieThough.init(englishMockConfig);

  const manageCookiesElement = document.getElementById('manage-cookie-though');
  manageCookiesElement?.addEventListener('click', () => {
    window.cookieThough.setVisible(true);
  });

  const switchCookiesElement = document.getElementById('switch-config');
  let language = 'english';
  switchCookiesElement?.addEventListener('click', () => {
    if (language === 'english') {
      language = 'dutch';
      CookieThough.init(dutchMockConfig);
    } else {
      language = 'english';
      CookieThough.init(englishMockConfig);
    }
  });
});
