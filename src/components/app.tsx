import type { Config } from '../config';
import defaultConfig, { COOKIE_PREFERENCES_KEY } from '../config';
import { ContainerProvider } from '../context/container';
import { OnPreferencesChangedProvider } from '../context/onPreferencesChanged';
import useLayoutEffectOnce from '../hooks/useLayoutEffectOnce';
import { BANNER_SPACING } from '../lib';
import getConsent from '../utils/consent';
import { getHiddenContainerBottom, toggleContainer } from '../utils/container';

import appCSS from './app.css?inline';
import buttonCSS from './button/button.css?inline';
import Consent from './consent';
import consentCSS from './consent/consent.css?inline';
import optionCSS from './consent/option/option.css?inline';
import Header from './header';
import headerCSS from './header/header.css?inline';
import resetCSS from './reset.css?inline';

interface Props {
  config: Config;
  container: HTMLElement;
}

const App = ({ config, container }: Props) => {
  const {
    header = defaultConfig.header,
    policies,
    cookiePreferencesKey = COOKIE_PREFERENCES_KEY,
    customizeLabel,
    optionsAriaLabel,
    essentialLabel,
    permissionLabels,
    cookiePolicy,
  } = config;
  const consent = getConsent({ policies, cookiePreferencesKey });

  useLayoutEffectOnce(() => {
    // Hide the initial container
    container.style.bottom = getHiddenContainerBottom(container);
    container.setAttribute('aria-hidden', 'true');

    // Perform initial pop-up if the user has not customised his/her cookie preferences
    if (!consent.isCustomised) setTimeout(() => toggleContainer(true, BANNER_SPACING));
  });

  return (
    <OnPreferencesChangedProvider onPreferencesChanged={config.onPreferencesChanged}>
      <ContainerProvider container={container}>
        <Header intro={header.intro} title={header.title} description={header.description} />
        <Consent
          customizeLabel={customizeLabel ?? defaultConfig.customizeLabel}
          optionsAriaLabel={optionsAriaLabel ?? defaultConfig.optionsAriaLabel}
          consent={consent}
          essentialLabel={essentialLabel ?? defaultConfig.essentialLabel}
          permissionLabels={permissionLabels ?? defaultConfig.permissionLabels}
          cookiePolicy={cookiePolicy}
          cookiePreferencesKey={cookiePreferencesKey}
        />
      </ContainerProvider>
      <style>
        {resetCSS}
        {appCSS}
        {buttonCSS}
        {headerCSS}
        {consentCSS}
        {optionCSS}
      </style>
    </OnPreferencesChangedProvider>
  );
};

export default App;
