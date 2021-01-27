import { Category, CookiePreferences } from './../../types';
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
      onPreferencesChanged: () => jest.fn(),
    });
    expect(getCookiePreferences()).toEqual({
      isCustomised: false,
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
    });
  });

  it('will return the default preferences when initialised and getting the cookie preferences for the first time', () => {
    const { getCookiePreferences } = useCookie({
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
      onPreferencesChanged: () => jest.fn(),
    });
    expect(getCookiePreferences()).toEqual(DEFAULT_COOKIE_PREFERENCES);
    expect(getCookie(COOKIE_PREFERENCES_KEY)).toBeUndefined();
  });

  test('when setting the options it will call the onPreferencesChanged callback', () => {
    const onPreferencesChanged = jest.fn((preferences: CookiePreferences) => {
      expect(preferences).toEqual(DEFAULT_COOKIE_PREFERENCES);
    });
    const { setCookiePreferences } = useCookie({
      cookieOptions: DEFAULT_COOKIE_PREFERENCES.cookieOptions,
      onPreferencesChanged,
    });
    setCookiePreferences(DEFAULT_COOKIE_PREFERENCES);
    expect(getCookie(COOKIE_PREFERENCES_KEY)).toEqual(DEFAULT_COOKIE_PREFERENCES);
    expect(onPreferencesChanged).toBeCalledTimes(1);
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
        onPreferencesChanged: () => jest.fn(),
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
      const { getCookiePreferences } = useCookie({
        cookieOptions: newCookieOptions,
        onPreferencesChanged: () => jest.fn(),
      });
      expect(getCookiePreferences()).toEqual({
        cookieOptions: newCookieOptions,
        isCustomised: false,
      });
    });
  });
});
