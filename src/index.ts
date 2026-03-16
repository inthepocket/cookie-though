/*
  FYI: This file and the index.html file are part of the demo site
  None of this code is part of the actual plugin ;)
*/
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('preact/debug');
}
import { CookiePreferences } from './types';
import { englishMockConfig, dutchMockConfig } from './tests/__mocks__/config';
import { init, configure, onPreferencesChanged, show, getPreferences } from './lib';

const initialiseCookieThough = () => {
  init({ ...englishMockConfig });
  onPreferencesChanged((preferences: CookiePreferences) => {
    console.log('preferences have changed via Event Emitter', preferences);
  });
};

let currentLanguage = 'english';
const switchConfig = () => {
  if (currentLanguage === 'english') {
    currentLanguage = 'dutch';
    return configure({ ...dutchMockConfig });
  }

  currentLanguage = 'english';
  return configure({ ...englishMockConfig });
};

const addCustomListeners = () => {
  const manageCookiesElement = document.getElementById('manage-cookie-though')!;
  const switchCookiesElement = document.getElementById('switch-config')!;

  manageCookiesElement.addEventListener('click', () => show());
  switchCookiesElement.addEventListener('click', () => switchConfig());
};

window.addEventListener('DOMContentLoaded', () => {
  initialiseCookieThough();
  addCustomListeners();
  document.getElementById('manage-cookie-though')?.addEventListener('click', () => {
    show();
  });
  console.log('current preferences', getPreferences());
});
