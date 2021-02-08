import { englishMockConfig, dutchMockConfig } from './__mocks__/config';
import { init, getPreferences, onPreferencesChanged, hide, configure, show } from '../lib';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

describe('Cookie Though', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ fontSize: '12px', height: '1px', bottom: '1px' }),
    });
  });

  beforeEach(() => {
    const manageCookiesElement = document.createElement('button');
    manageCookiesElement.id = 'manage-cookie-though';
    document.body.append(manageCookiesElement);
  });

  afterEach(() => {
    clearCookies();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });
  it('can render the app based on the init function', () => {
    init({ ...englishMockConfig });

    expect(document.querySelector('.cookie-though')).toBeDefined();
    expect(document.querySelector('.visible')).toBeDefined();
  });

  describe('when the app is initialised', () => {
    it('can switch the config', () => {
      init({ ...englishMockConfig });
      const shadowRoot = document.querySelector('.cookie-though')?.shadowRoot as ShadowRoot;

      let cookiePolicyLink = shadowRoot.querySelector('a');
      expect(cookiePolicyLink?.text).toEqual(englishMockConfig.cookiePolicy.label);

      configure({ ...dutchMockConfig });
      expect(document.getElementsByClassName('cookie-though').length).toEqual(1);
      cookiePolicyLink = shadowRoot.querySelector('a');
      expect(cookiePolicyLink?.text).toEqual(dutchMockConfig.cookiePolicy.label);
    });

    it('can toggle the cookie wall with the setVisible function', () => {
      init({ ...englishMockConfig });

      hide();
      expect(document.querySelector('.visible')).toBeNull();

      show();
      expect(document.querySelector('.visible')).toBeDefined();
    });

    it('will return the preferences with the getPreferences function', () => {
      init({ ...englishMockConfig });

      expect(getPreferences()).toEqual({
        cookieOptions: [
          {
            id: 'essential',
            isEnabled: true,
          },
          {
            id: 'functional',
            isEnabled: false,
          },
          {
            id: 'statistics',
            isEnabled: false,
          },
          {
            id: 'marketing',
            isEnabled: false,
          },
        ],
        isCustomised: false,
      });
    });

    it('will call the listener function passed to onPreferenchesChanged when the preferences are updated', () => {
      const handlePreferencesChanged = jest.fn((preferences: CookiePreferences) => {
        expect(preferences).toEqual({
          cookieOptions: [
            {
              id: 'essential',
              isEnabled: true,
            },
            {
              id: 'functional',
              isEnabled: true,
            },
            {
              id: 'statistics',
              isEnabled: true,
            },
            {
              id: 'marketing',
              isEnabled: true,
            },
          ],
          isCustomised: true,
        });
      });
      init({ ...englishMockConfig });
      const shadowRoot = document.querySelector('.cookie-though')?.shadowRoot as ShadowRoot;

      const acceptAllButton = Array.from(shadowRoot.querySelectorAll('button')).find(
        button => button.textContent === 'Accept all',
      );
      onPreferencesChanged(handlePreferencesChanged);
      acceptAllButton?.click();
      expect(handlePreferencesChanged).toBeCalledTimes(1);
    });
  });

  describe("when the app isn't initialised", () => {
    type Lib = {
      onPreferencesChanged: (listener: (cookiePreferences: CookiePreferences) => void) => void;
      getPreferences: () => CookiePreferences;
      show: () => void;
      hide: () => void;
    };

    let lib: Lib;
    beforeEach(() => {
      jest.resetModules();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      lib = require('../lib');
    });
    it('will initialise the app when a listener is attached to the cookie preferences changed event', () => {
      lib.onPreferencesChanged(jest.fn());
      expect(document.querySelector('.cookie-though')).toBeDefined();
      expect(document.querySelector('.visible')).toBeDefined();
    });

    it('will initialise the app when getPreferences is called', () => {
      expect(lib.getPreferences()).toEqual({
        cookieOptions: [
          {
            id: 'essential',
            isEnabled: true,
          },
          {
            id: 'functional',
            isEnabled: false,
          },
          {
            id: 'statistics',
            isEnabled: false,
          },
          {
            id: 'marketing',
            isEnabled: false,
          },
          {
            id: 'social',
            isEnabled: false,
          },
          {
            id: 'personalisation',
            isEnabled: false,
          },
        ],
        isCustomised: false,
      });
      expect(document.querySelector('.cookie-though')).toBeDefined();
      expect(document.querySelector('.visible')).toBeDefined();
    });

    it('will initialise the app and show the cookie wall when show is called', () => {
      lib.show();
      expect(document.querySelector('.cookie-though')).toBeDefined();
      expect(document.querySelector('.visible')).toBeDefined();
    });

    it('will initialise the app and hide the cookie wall when hide is called', () => {
      lib.hide();
      expect(document.querySelector('.cookie-though')).toBeDefined();
      expect(document.querySelector('.visible')).toBeNull();
    });
  });
});
