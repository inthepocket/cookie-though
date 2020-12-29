import { CookieOption } from '../types';
import { CookiePreferences } from './../components/app';

const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

const useLocalStorage = (cookieOptions: CookieOption[]) => {
  const defaultCookiePreferences: CookiePreferences = {
    cookieOptions,
    isCustomised: false,
  };

  const setCookiePreferences = (cookiePreferences: CookiePreferences) => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(cookiePreferences));
    return cookiePreferences;
  };

  const getCookiePreferences = () => {
    const rawCookiePreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    return rawCookiePreferences
      ? (JSON.parse(rawCookiePreferences) as CookiePreferences)
      : setCookiePreferences(defaultCookiePreferences);
  };

  return [getCookiePreferences, setCookiePreferences];
};

export default useLocalStorage;
