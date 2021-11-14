import { Config, COOKIE_PREFERENCES_KEY } from '../config';
import { ContainerProvider } from '../context/container';
import { OnPreferencesChangedProvider } from '../context/onPreferencesChanged';
import useLayoutEffectOnce from '../hooks/useLayoutEffectOnce';
import { BANNER_SPACING } from '../lib';
import getConsent from '../utils/consent';
import { getHiddenContainerBottom, toggleContainer } from '../utils/container';
import Consent from './consent';
import Header from './header';

/* istanbul ignore if */
if (process.env.NODE_ENV === 'development') require('preact/debug');

interface Props {
  config: Config;
  container: HTMLElement;
}

const App = ({ config, container }: Props) => {
  const { title, intro, description } = config.header;
  const {
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
        <Header intro={intro} title={title} description={description} />
        <Consent
          customizeLabel={customizeLabel}
          optionsAriaLabel={optionsAriaLabel}
          consent={consent}
          essentialLabel={essentialLabel}
          permissionLabels={permissionLabels}
          cookiePolicy={cookiePolicy}
          cookiePreferencesKey={cookiePreferencesKey}
        />
      </ContainerProvider>
    </OnPreferencesChangedProvider>
  );
};

export default App;
