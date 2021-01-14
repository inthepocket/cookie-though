import { Fragment, FunctionalComponent, h, render } from 'preact';
import Banner from './banner';
import Customization from './customization';
import { useEffect, useState } from 'preact/hooks';
import { CookieOption } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import './app.css';

interface Props {
  cookieOptions: CookieOption[];
  cookiePreferenceKey?: string;
  setVisible(value: boolean): void;
}

export type CookiePreferences = {
  isCustomised: boolean;
  cookieOptions: CookieOption[];
};

interface Config {
  cookieOptions: CookieOption[];
  cookiePreferenceKey?: string;
}

// TODO: cleanup event listener
export const App: FunctionalComponent<Props> = ({
  cookieOptions,
  setVisible,
  cookiePreferenceKey = '',
}) => {
  const { getCookiePreferences } = useLocalStorage({ cookieOptions, cookiePreferenceKey });
  const [cookiePreferences] = useState(() => getCookiePreferences());
  useEffect(() => {
    if (!cookiePreferences.isCustomised) {
      setVisible(true);
    }
  }, [cookiePreferences, setVisible]);

  return (
    <Fragment>
      <Banner />
      <Customization cookieOptions={cookiePreferences?.cookieOptions} setVisible={setVisible} />
    </Fragment>
  );
};
const setVisible = function (value: boolean) {
  if (value) {
    return document.querySelector('.cookie-though')?.classList.add('visible');
  }
  document.querySelector('.cookie-though')?.classList.remove('visible');
};

const initCookieThough = (config: Config) => {
  const container = document.createElement('div');
  container.className = 'cookie-though';
  document.body.append(container);

  render(h(App, { ...config, setVisible }), container);
  return { setVisible };
};

export default initCookieThough;
