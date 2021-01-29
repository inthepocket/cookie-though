// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}
import { CookiePreferences } from './types';
import englishMockConfig, { dutchMockConfig } from './tests/__mocks__/config';

// This initialises the app for development purposes
import CookieThough from './components/app';

window.addEventListener('DOMContentLoaded', () => {
  CookieThough.init({
    ...englishMockConfig,
  });
  CookieThough.listen((preferences: CookiePreferences) => {
    console.log('preferences have changed via Event Emitter', preferences);
  });
  const manageCookiesElement = document.getElementById('manage-cookie-though');
  manageCookiesElement?.addEventListener('click', () => {
    CookieThough.setVisible(true);
  });
  console.log('state', CookieThough.getCookiePreferences());

  const switchCookiesElement = document.getElementById('switch-config');
  let language = 'english';
  switchCookiesElement?.addEventListener('click', () => {
    if (language === 'english') {
      language = 'dutch';
      CookieThough.init({
        ...dutchMockConfig,
      });
    } else {
      language = 'english';
      CookieThough.init({
        ...englishMockConfig,
      });
    }
  });
});
