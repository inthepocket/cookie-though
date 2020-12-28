import { Fragment, FunctionalComponent, h, render } from 'preact';
import Banner from './banner/banner';
import Customization from './customization/customization';
import { useEffect, useState } from 'preact/hooks';
import { CookieOption } from './customization/option';
import Slider from './customization/slider';

interface Props {
  manageId: string;
  cookieOptions: CookieOption[];
}

export type CookiePreferences = {
  isCustomised: boolean;
  cookieOptions: CookieOption[];
};

interface Config {
  [key: string]: string | number | boolean | CookieOption[];
  manageId: string;
  cookieOptions: CookieOption[];
}

const showCookieThough = () => {
  document.querySelector('.cookie-though')?.classList.add('visible');
};

export const hideCookieThough = () => {
  document.querySelector('.cookie-though')?.classList.remove('visible');
};

const App: FunctionalComponent<Props> = ({ manageId, cookieOptions }) => {
  const [cookiePreferences] = useState<CookiePreferences>(() => {
    const rawCookiePreferences = localStorage.getItem('cookie-preferences');
    return rawCookiePreferences
      ? JSON.parse(rawCookiePreferences)
      : { isCustomised: false, cookieOptions };
  });

  useEffect(() => {
    const manageCookiesElement = document.getElementById(manageId);
    if (manageCookiesElement === null) {
      console.error('No valid id given to trigger the cookie though modal');
    }

    if (!cookiePreferences) {
      localStorage.setItem(
        'cookie-preferences',
        JSON.stringify({ isCustomised: false, cookieOptions }),
      );
      showCookieThough();
    } else if (!cookiePreferences.isCustomised) {
      showCookieThough();
    }

    manageCookiesElement?.addEventListener('click', () => {
      showCookieThough();
    });
  }, [manageId, cookiePreferences, cookieOptions]);

  return (
    <Fragment>
      <Banner />
      <Customization cookieOptions={cookiePreferences?.cookieOptions} />
    </Fragment>
  );
};

const initCookieThough = (config: Config): void => {
  const container = document.createElement('div');
  container.className = 'cookie-though';
  document.body.append(container);

  render(h(App, config), container);
};

export default initCookieThough;
