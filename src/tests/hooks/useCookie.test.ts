import { Category } from './../../types';
import { CookiePreferences } from '../../components/app';
import { COOKIE_PREFERENCES_KEY, getCookie } from '../../hooks/useCookie';
import useCookie from '../../hooks/useCookie';
import mockConfig from '../__mocks__/config';
import clearCookies from '../utils/clearCookies';

describe('useCookie', () => {
  const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
    isCustomised: false,
    cookieOptions: mockConfig.policies.map(policy => ({ ...policy, isEnabled: false })),
  };

  afterEach(() => {
    clearCookies();
  });

  it('can get the cookie preferences', () => {
    document.cookie = `cookie-preferences=${JSON.stringify(DEFAULT_COOKIE_PREFERENCES)}`;
    document.cookie = `foo=bar`;
    const { getCookiePreferences } = useCookie({
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
    });
    expect(getCookiePreferences()).toEqual({
      isCustomised: false,
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
    });
  });

  it('will set the default options when initialised and getting the cookie preferences for the first time', () => {
    const { getCookiePreferences } = useCookie({
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
    });
    expect(getCookiePreferences()).toEqual(DEFAULT_COOKIE_PREFERENCES);
  });

  it('can set the options', () => {
    const { setCookiePreferences } = useCookie({
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
    });
    setCookiePreferences(DEFAULT_COOKIE_PREFERENCES);
    expect(getCookie(COOKIE_PREFERENCES_KEY)).toEqual(DEFAULT_COOKIE_PREFERENCES);
  });

  describe('when the policies get updated', () => {
    beforeEach(() => {
      document.cookie = `cookie-preferences=${JSON.stringify({
        cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
        isCustomised: true,
      })}`;
    });

    it('will do nothing if the policy have remained the same', () => {
      const { getCookiePreferences } = useCookie({
        cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
      });
      expect(getCookiePreferences()).toEqual({ ...DEFAULT_COOKIE_PREFERENCES, isCustomised: true });
    });

    it('will merge the preferences of the user with the new policies', () => {
      const newCookieOptions = [
        ...DEFAULT_COOKIE_PREFERENCES.cookieOptions,
        {
          id: 'id',
          label: 'label',
          description: 'description',
          category: Category.Functional,
          isEnabled: false,
        },
      ];
      const { getCookiePreferences } = useCookie({ cookieOptions: newCookieOptions });
      expect(getCookiePreferences()).toEqual({
        cookieOptions: newCookieOptions,
        isCustomised: false,
      });
    });
  });
});
