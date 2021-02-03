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
  const container = document.createElement('div');
  container.className = 'cookie-though';
  container.style.bottom = '-250px';
  const shadowRoot = container.attachShadow({ mode: 'open' });
  const cssLink = document.createElement('link');
  cssLink.setAttribute('rel', 'stylesheet');
  cssLink.setAttribute(
    'href',
    /* istanbul ignore next */
    ['staging', 'development'].find(x => x == process.env.NODE_ENV)
      ? 'src.77de5100.css'
      : `https://unpkg.com/cookie-though@${process.env.GIT_TAG!}/dist/lib.css`,
  );

  shadowRoot.appendChild(cssLink);

  const previousInstance = document.querySelector('.cookie-though') as HTMLElement;
  if (previousInstance && previousInstance.shadowRoot) {
    render(h(App, { ...config, ee }), previousInstance.shadowRoot);
    return;
  }

  document.body.append(container);
  render(h(App, { ...config, ee }), shadowRoot);
};

export const init = configure;

export const onPreferencesChanged = (listener: (cookiePreferences: CookiePreferences) => void) => {
  if (!config) init(defaultConfig);

  ee.on(COOKIE_PREFERENCES_CHANGED_EVENT, listener);
};

export const getPreferences = () => {
  if (!config) configure(defaultConfig);

  return getCookiePreferences(
    config.policies.map(policy => ({
      id: policy.id,
      isEnabled: isEssential(policy.category),
    })),
    config.cookiePreferenceKey ?? COOKIE_PREFERENCES_KEY,
  );
};

export const show = () => {
  if (!config) init(defaultConfig);

  return setVisible(true);
};

export const hide = () => {
  if (!config) init(defaultConfig);

  return setVisible(false);
};
