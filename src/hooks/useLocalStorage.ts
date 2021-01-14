import { CookieOption } from '../types';
import { CookiePreferences } from './../components/app';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

interface Options {
  cookieOptions: CookieOption[];
  cookiePreferenceKey?: string;
}
const useLocalStorage = ({ cookieOptions, cookiePreferenceKey }: Options) => {
  const preferences: CookiePreferences = {
    cookieOptions,
    isCustomised: false,
  };
  const key = cookiePreferenceKey ?? COOKIE_PREFERENCES_KEY;

  const setCookiePreferences = (cookiePreferences: CookiePreferences) => {
    localStorage.setItem(key, JSON.stringify(cookiePreferences));
    return cookiePreferences;
  };

  const getCookiePreferences = () => {
    const rawCookiePreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    return rawCookiePreferences
      ? (JSON.parse(rawCookiePreferences) as CookiePreferences)
      : setCookiePreferences(preferences);
  };

  return { getCookiePreferences, setCookiePreferences };
};

export default useLocalStorage;
