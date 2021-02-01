import mockConfig, { dutchMockConfig } from './__mocks__/config';
import CookieThough from '../lib';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

jest.mock('./utils/dom', () => ({
  setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
}));

describe('Cookie Though', () => {
  afterEach(() => {
    clearCookies();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  describe('init function', () => {
    beforeEach(() => {
      const manageCookiesElement = document.createElement('button');
      manageCookiesElement.id = 'manage-cookie-though';
      document.body.append(manageCookiesElement);
    });

    it('can render the app based on the init function', () => {
      CookieThough.init({ ...mockConfig });

      expect(document.querySelector('.cookie-though')).toBeDefined();
    });

    it('can switch the config', () => {
      CookieThough.init({ ...mockConfig });
      const shadowRoot = document.querySelector('.cookie-though')?.shadowRoot as ShadowRoot;

      let cookiePolicyLink = shadowRoot.querySelector('a');
      expect(cookiePolicyLink?.text).toEqual(mockConfig.cookiePolicy.label);

      CookieThough.init({ ...dutchMockConfig });
      expect(document.getElementsByClassName('cookie-though').length).toEqual(1);
      cookiePolicyLink = shadowRoot.querySelector('a');
      expect(cookiePolicyLink?.text).toEqual(dutchMockConfig.cookiePolicy.label);
    });

    it('can hide the cookie wall with the setVisible function', () => {
      CookieThough.init({ ...mockConfig });

      expect(document.querySelector('.cookie-though')).toBeDefined();
      expect(document.querySelector('.visible')).toBeDefined();
      CookieThough.setVisible(false);
      expect(document.querySelector('.visible')).toBeNull();
    });

    it('will return the preferences with the getCookiePreferences function', () => {
      CookieThough.init({ ...mockConfig });

      expect(CookieThough.getCookiePreferences()).toEqual({
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
            id: 'analytics',
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

    it('will call the onPreferencesChanged callback when the preferences are updated', () => {
      const onPreferencesChanged = jest.fn((preferences: CookiePreferences) => {
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
              id: 'analytics',
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
      CookieThough.init({ ...mockConfig });
      const shadowRoot = document.querySelector('.cookie-though')?.shadowRoot as ShadowRoot;

      const acceptAllButton = Array.from(shadowRoot.querySelectorAll('button')).find(
        button => button.textContent === 'Accept all',
      );
      CookieThough.listen(onPreferencesChanged);
      acceptAllButton?.click();
      expect(onPreferencesChanged).toBeCalledTimes(1);
    });
  });
});
