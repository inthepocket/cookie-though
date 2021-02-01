// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}
import { CookiePreferences } from './types';
import englishMockConfig, { dutchMockConfig } from './tests/__mocks__/config';

// This initialises the app for development purposes
import { configure, listen, show, get } from './lib';

window.addEventListener('DOMContentLoaded', () => {
  configure({
    ...englishMockConfig,
  });
  listen((preferences: CookiePreferences) => {
    console.log('preferences have changed via Event Emitter', preferences);
  });
  const manageCookiesElement = document.getElementById('manage-cookie-though');
  manageCookiesElement?.addEventListener('click', () => {
    show();
  });
  console.log('state', get());

  const switchCookiesElement = document.getElementById('switch-config');
  let language = 'english';
  switchCookiesElement?.addEventListener('click', () => {
    if (language === 'english') {
      language = 'dutch';
      configure({
        ...dutchMockConfig,
      });
    } else {
      language = 'english';
      configure({
        ...englishMockConfig,
      });
    }
  });
});
