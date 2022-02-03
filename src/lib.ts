import { h, render } from 'preact';

import App from './components/app';
import defaultConfig, { Config, COOKIE_PREFERENCES_KEY } from './config';
import { createNewContainer, getContainer, toggleContainer } from './utils/container';
import { getPreferences } from './utils/preferences';

export const BANNER_SPACING = 'var(--ct-banner-spacing)';

let cookiePrefencesKey = COOKIE_PREFERENCES_KEY;

export const configure = (config: Config = defaultConfig) => {
  if (config.cookiePreferencesKey) cookiePrefencesKey = config.cookiePreferencesKey;

  const previousInstance = getContainer();
  if (previousInstance && previousInstance.shadowRoot) {
    render(h(App, { config, container: previousInstance }), previousInstance.shadowRoot);
    return previousInstance;
  }

  const { container, shadowRoot } = createNewContainer(config.ariaLabel || defaultConfig.ariaLabel);
  document.body.prepend(container);
  render(h(App, { config, container }), shadowRoot);
  return container;
};

export const init = configure;

export const show = () => toggleContainer(true, BANNER_SPACING);

export const hide = () => toggleContainer(false);

export const getCookiePreferences = () => {
  const preferences = getPreferences(cookiePrefencesKey);

  return { isCustomised: !!preferences, preferences };
};
