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

export type RootStyles = {
  height: number;
  bottom: number;
};

export const CONTAINER_WIDTHS = ['360px', '380px', '425px', '500px'];
export const MOBILE_CONTAINER_BOTTOMS = ['-350px', '-400px'];

/**
 * Sets the width of the modal in case the user has a larger font size
 */
const setModalWidth = (rootNode: HTMLDivElement, rootFontSize: number) => {
  const isMobile = window.innerWidth < 640;

  if (14 < rootFontSize) {
    rootNode.style.bottom = '-300px';
  }

  if (13 < rootFontSize && rootFontSize < 14) {
    if (!isMobile) rootNode.style.width = CONTAINER_WIDTHS[0];
  }

  if (14 < rootFontSize && rootFontSize < 16) {
    if (!isMobile) rootNode.style.width = CONTAINER_WIDTHS[1];
  }

  if (16 < rootFontSize && rootFontSize < 18) {
    if (isMobile) rootNode.style.bottom = MOBILE_CONTAINER_BOTTOMS[0];
    if (!isMobile) rootNode.style.width = CONTAINER_WIDTHS[2];
  }

  if (rootFontSize >= 18) {
    if (isMobile) rootNode.style.bottom = MOBILE_CONTAINER_BOTTOMS[1];
    if (!isMobile) rootNode.style.width = CONTAINER_WIDTHS[3];
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
  const rootNode = document.querySelector('.cookie-though') as HTMLDivElement;
  const { fontSize, height, bottom } = window.getComputedStyle(rootNode);

  useEffect(() => {
    setModalWidth(rootNode, +fontSize.slice(0, -2));
    if (!cookiePreferences.isCustomised) {
      setVisible(true);
    }
  }, [cookiePreferences, fontSize, rootNode]);

  return (
    <Fragment>
      <Banner header={header} />
      <Customization
        rootStyles={{ height: +height.slice(0, -2), bottom: +bottom.slice(0, -2) }}
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
