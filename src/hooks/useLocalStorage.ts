import { CookieOption } from '../types';
import { CookiePreferences } from './../components/app';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

const useLocalStorage = (cookieOptions: CookieOption[]) => {
  const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
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
      : setCookiePreferences(DEFAULT_COOKIE_PREFERENCES);
  };

  return { getCookiePreferences, setCookiePreferences };
};

export default useLocalStorage;
