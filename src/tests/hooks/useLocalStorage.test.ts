import { CookiePreferences } from './../../components/app';
import { COOKIE_PREFERENCES_KEY } from './../../hooks/useLocalStorage';
import useLocalStorage from '../../hooks/useLocalStorage';
import mockCookies from '../__mocks__/cookieOptions';

describe('useLocalStorage', () => {
  const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
    isCustomised: false,
    cookieOptions: mockCookies,
  };

  afterEach(() => {
    localStorage.clear();
  });

  it('can get the options', () => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(DEFAULT_COOKIE_PREFERENCES));
    const { getCookiePreferences } = useLocalStorage(mockCookies);
    expect(getCookiePreferences()).toEqual({ isCustomised: false, cookieOptions: mockCookies });
  });

  it('will set the default options when initialised and getting the cookie preferences for the first time', () => {
    const { getCookiePreferences } = useLocalStorage(mockCookies);
    expect(getCookiePreferences()).toEqual(DEFAULT_COOKIE_PREFERENCES);
  });

  it('can set the options', () => {
    const { setCookiePreferences } = useLocalStorage(mockCookies);
    setCookiePreferences(DEFAULT_COOKIE_PREFERENCES);
    expect(JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY) as string)).toEqual(
      DEFAULT_COOKIE_PREFERENCES,
    );
  });
});
