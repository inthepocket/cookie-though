import { useADPC, getADPCPreferences } from './utils/ADPC';
import { hasADPC } from './utils/ADPC';
import App from './components/app';
import { EventEmitter } from 'events';
import { setVisible } from './utils/dom';
import { Config, CookiePreferences } from './types';
import {
  COOKIE_PREFERENCES_CHANGED_EVENT,
  COOKIE_PREFERENCES_KEY,
  getCookiePreferences,
} from './hooks/useCookie';
import { h, render } from 'preact';
import { isEssential } from './utils/category';
import defaultConfig from './config/defaultConfig';

let config: Config;
const ee = new EventEmitter();

export const configure = (conf: Config) => {
  config = conf;

  if (config.experimental?.enableADPC) {
    if (hasADPC()) return useADPC(config.policies, ee);
  }

  const container = document.createElement('aside');
  container.className = 'cookie-though';
  container.style.bottom = '-600px';
  container.style.display = 'none';
  const shadowRoot = container.attachShadow({ mode: 'open' });
  let css: HTMLStyleElement | HTMLLinkElement;
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', 'src.77de5100.css');
  } else {
    css = document.createElement('style');
    /*
      In order for the CI to do it's job, make sure minified-css remains
      The CI will build the css, minify it and replace 'minified-css'
      with the actual minified css, which means it doesn't have to be fetched
      from a cdn and thus speeds up the load of the app.
    */
    css.textContent = 'minified-css';
  }

  shadowRoot.appendChild(css);

  const previousInstance = document.querySelector('.cookie-though') as HTMLElement;
  if (previousInstance && previousInstance.shadowRoot) {
    render(h(App, { ...config, ee }), previousInstance.shadowRoot);
    return;
  }

  document.body.prepend(container);
  render(h(App, { ...config, ee }), shadowRoot);
};

export const init = configure;

export const onPreferencesChanged = (listener: (cookiePreferences: CookiePreferences) => void) => {
  if (!config) init(defaultConfig);

  ee.on(COOKIE_PREFERENCES_CHANGED_EVENT, listener);
};

export const getPreferences = async () => {
  if (!config) configure(defaultConfig);
  if (hasADPC()) return getADPCPreferences(config.policies);

  return getCookiePreferences(
    config.policies.map(policy => ({
      id: policy.id,
      isEnabled: isEssential(policy.category),
    })),
    config.cookiePreferenceKey ?? COOKIE_PREFERENCES_KEY,
  );
};

export const show = () => {
  if (config.experimental?.enableADPC && hasADPC()) return;
  if (!config) init(defaultConfig);

  return setVisible(true);
};

export const hide = () => {
  if (config.experimental?.enableADPC && hasADPC()) return;
  if (!config) init(defaultConfig);

  return setVisible(false);
};
