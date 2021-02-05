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

export const CONTAINER_WIDTHS = ['360px', '380px', '425px', '500px'];

/**
 * Sets the width of the modal in case the user has a larger font size
 */
const setModalWidth = () => {
  const container = document.querySelector('.cookie-though') as HTMLElement;
  const fontSize = +window.getComputedStyle(container, ':host')?.fontSize?.slice(0, 2);
  const isMobile = window.innerWidth < 640;

  if (12 < fontSize && fontSize < 14) {
    if (!isMobile) container.style.width = CONTAINER_WIDTHS[0];
  }

  if (14 < fontSize && fontSize < 16) {
    container.style.bottom = '-300px';
    if (!isMobile) container.style.width = CONTAINER_WIDTHS[1];
  }

  if (16 < fontSize && fontSize < 18) {
    if (isMobile) container.style.bottom = '-350px';
    if (!isMobile) container.style.width = CONTAINER_WIDTHS[2];
  }

  if (fontSize >= 18) {
    isMobile ? (container.style.bottom = '-400px') : (container.style.bottom = '-300px');
    if (!isMobile) container.style.width = CONTAINER_WIDTHS[3];
  }
};

const App: FunctionalComponent<Props> = ({
  policies,
  cookiePreferenceKey,
  header,
  customizeLabel,
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
    setModalWidth();
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
        customizeLabel={customizeLabel}
        permissionLabels={permissionLabels}
        setCookiePreferences={setCookiePreferences}
      />
    </Fragment>
  );
};
export default App;
