import { CookiePreferences } from './types';
import englishMockConfig, { dutchMockConfig } from './tests/__mocks__/config';
// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

// This initialises the app for development purposes
// import CookieThough from '../dist/app';
import CookieThough from './components/app';
window.addEventListener('DOMContentLoaded', () => {
  const { setVisible } = CookieThough.init({
    ...englishMockConfig,
    onPreferencesChanged: (preferences: CookiePreferences) => {
      console.log({ preferences });
    },
  });

  const manageCookiesElement = document.getElementById('manage-cookie-though');
  manageCookiesElement?.addEventListener('click', () => {
    setVisible(true);
  });

  const switchCookiesElement = document.getElementById('switch-config');
  let language = 'english';
  switchCookiesElement?.addEventListener('click', () => {
    if (language === 'english') {
      language = 'dutch';
      CookieThough.init({
        ...dutchMockConfig,
        onPreferencesChanged: (preferences: CookiePreferences) => {
          console.log({ preferences });
        },
      });
    } else {
      language = 'english';
      CookieThough.init({
        ...englishMockConfig,
        onPreferencesChanged: (preferences: CookiePreferences) => {
          console.log({ preferences });
        },
      });
    }
  });
});
