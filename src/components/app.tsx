import { Fragment, FunctionalComponent, h, render } from 'preact';
import Banner from './banner';
import Customization from './customization';
import { useEffect } from 'preact/hooks';
import { Config, CookieOption, CookieOptions, CookiePreference, CookiePreferences } from '../types';
import useCookie from '../hooks/useCookie';
import './app.css';

interface Props extends Config {
  setVisible(value: boolean): void;
}

const setVisible = (value: boolean) => {
  if (value) {
    return document.querySelector('.cookie-though')?.classList.add('visible');
  }
  document.querySelector('.cookie-though')?.classList.remove('visible');
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
    cookieOptions: policies.map(policy => ({ id: policy.id, isEnabled: false })),
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
    const getPreferences = (id?: CookiePreference['id']) => {
      return id
        ? cookiePreferences.cookieOptions.filter(option => option.id === id)[0].isEnabled
        : ({
            ...cookiePreferences,
            cookieOptions: cookiePreferences.cookieOptions.map<CookiePreference>(
              cookiePreference => ({
                id: cookiePreference.id,
                isEnabled: cookiePreference.isEnabled,
              }),
            ),
          } as CookiePreferences);
    };
    if (!cookiePreferences.isCustomised) {
      setVisible(true);
    }

    window.cookieThough = { setVisible, getPreferences };
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

const CookieThough = {
  init(config: Config) {
    const container = document.createElement('div');
    container.className = 'cookie-though';

    const previousInstance = document.querySelector('.cookie-though');
    if (previousInstance) {
      return render(h(App, { ...config, setVisible }), previousInstance);
    }

    document.body.append(container);
    return render(h(App, { ...config, setVisible }), container);
  },
};

export default CookieThough;
