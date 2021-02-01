import { Fragment, FunctionalComponent, h } from 'preact';
import Banner from './banner';
import Customization from './customization';
import { useEffect } from 'preact/hooks';
import { Config, CookieOption, CookieOptions } from '../types';
import useCookie from '../hooks/useCookie';
import './app.css';

import { setVisible } from '../utils/dom';
import { EventEmitter } from 'events';
import { isEssential } from '../utils/category';

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
      isEnabled: isEssential(policy.category) ? true : false,
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
    const container = document.querySelector('.cookie-though') as HTMLElement;
    container.style.bottom = `-${container.clientHeight}px`;
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
