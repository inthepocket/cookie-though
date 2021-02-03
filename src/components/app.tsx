import { Fragment, FunctionalComponent, h } from 'preact';
import Banner from './banner';
import Customization from './customization';
import { useEffect } from 'preact/hooks';
import { Config, CookieOption, CookieOptions } from '../types';
import useCookie from '../hooks/useCookie';
import './app.css';

import { setVisible, isEssential } from '../utils';
import { EventEmitter } from 'events';

interface Props extends Config {
  ee?: EventEmitter;
}

const App: FunctionalComponent<Props> = ({
  policies,
  cookiePreferenceKey,
  header,
  cookiePolicy,
  permissionLabels,
  ee,
}) => {
  const { getCookiePreferences, setCookiePreferences } = useCookie({
    cookieOptions: policies.map(policy => ({
      id: policy.id,
      isEnabled: isEssential(policy.category),
    })),
    ee,
    cookiePreferenceKey,
  });
  const getCookieOptions = (): CookieOptions => {
    const preferences = getCookiePreferences();
    const cookieOptions = preferences.cookieOptions.map(option => {
      const policyToMerge = policies.find(policy => policy.id === option.id);
      return { ...policyToMerge, ...option } as CookieOption;
    });

    return { ...preferences, cookieOptions };
  };
  const cookiePreferences = getCookieOptions();

  useEffect(() => {
    if (!cookiePreferences.isCustomised) {
      setVisible(true);
    }
  }, [cookiePreferences]);

  return (
    <Fragment>
      <Banner header={header} />
      <Customization
        cookieOptions={cookiePreferences.cookieOptions}
        cookiePolicy={cookiePolicy}
        permissionLabels={permissionLabels}
        setCookiePreferences={setCookiePreferences}
      />
    </Fragment>
  );
};
export default App;
