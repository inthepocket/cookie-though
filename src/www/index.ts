import { init, show } from '../lib';

const initialiseCookieThough = () => {
  init();
};

const addButtonListeners = () => {
  const manageCookiesElement = document.getElementById('manage-cookie-though')!;
  // const switchCookiesElement = document.getElementById('switch-config')!;

  manageCookiesElement.addEventListener('click', () => show());
  // switchCookiesElement.addEventListener('click', () => switchConfig());
};

window.addEventListener('DOMContentLoaded', () => {
  initialiseCookieThough();
  addButtonListeners();
});
