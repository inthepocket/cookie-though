import { Fragment, FunctionalComponent, h, render } from 'preact';
import Banner from './banner';
import Customization from './customization';
import { useEffect, useState } from 'preact/hooks';
import { Config, CookieOption } from '../types';
import useCookie from '../hooks/useCookie';
import './app.css';

interface Props extends Config {
  setVisible(value: boolean): void;
}

export type CookiePreferences = {
  isCustomised: boolean;
  cookieOptions: CookieOption[];
};

export const App: FunctionalComponent<Props> = ({
  policies,
  cookiePreferenceKey,
  header,
  cookiePolicy,
  permissionLabels,
  setVisible,
}) => {
  const { getCookiePreferences } = useCookie({
    cookieOptions: policies.map(policy => ({ ...policy, isEnabled: false })),
    cookiePreferenceKey,
  });
  const [cookiePreferences] = useState(() => getCookiePreferences());
  useEffect(() => {
    window.cookieThough.getCookiePreferences = (id?: CookieOption['id']) => {
      return id
        ? cookiePreferences.cookieOptions.filter(option => option.id === id)[0]
        : cookiePreferences;
    };
    if (!cookiePreferences.isCustomised) {
      setVisible(true);
    }

    return () => {
      window.cookieThough.getCookiePreferences = undefined;
    };
  }, [cookiePreferences, setVisible]);

  return (
    <Fragment>
      <Banner header={header} />
      <Customization
        cookieOptions={cookiePreferences.cookieOptions}
        cookiePolicy={cookiePolicy}
        permissionLabels={permissionLabels}
        setVisible={setVisible}
      />
    </Fragment>
  );
};

const setVisible = (value: boolean) => {
  if (value) {
    return document.querySelector('.cookie-though')?.classList.add('visible');
  }
  document.querySelector('.cookie-though')?.classList.remove('visible');
};

const CookieThough = {
  init(config: Config) {
    const container = document.createElement('div');
    container.className = 'cookie-though';

    const previousInstance = document.querySelector('.cookie-though');
    if (previousInstance) {
      render(h(App, { ...config, setVisible }), previousInstance);
      return { setVisible };
    }

    document.body.append(container);
    render(h(App, { ...config, setVisible }), container);
    return { setVisible };
  },
};

export default CookieThough;
