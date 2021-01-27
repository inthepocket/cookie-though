import { Config } from './../types';
import { CookiePreference, CookiePreferences } from '../types';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

interface Options {
  cookieOptions: CookiePreference[];
  cookiePreferenceKey?: string;
  onPreferencesChanged: Config['onPreferencesChanged'];
}

export const getCookie = (cookieKey: string): CookiePreferences | undefined => {
  const rawCookies = decodeURIComponent(document.cookie).split(';');
  return rawCookies.reduce((cookiePreferences, cookie) => {
    if (cookiePreferences) return cookiePreferences;

    const [key, value] = cookie.split('=');
    if (key === cookieKey) return JSON.parse(value);
  }, undefined);
};

export const getNextYear = () => {
  const now = new Date();
  return new Date(now.setFullYear(now.getFullYear() + 1));
};

const policiesHaveChanged = (
  policyIds: CookiePreference['id'][],
  preferenceIds: CookiePreference['id'][],
) => {
  return policyIds.some(id => !policyIds.includes(id)) || policyIds.length !== preferenceIds.length;
};

const mergePolicies = (
  policies: CookiePreference[],
  preferences: CookiePreference[],
): CookiePreference[] => {
  return policies.map(policy => {
    const isEnabled = preferences.reduce((isPreferenceEnabled, preference) => {
      return preference.id === policy.id ? preference.isEnabled : isPreferenceEnabled;
    }, false);

    return { ...policy, isEnabled };
  });
};

const useCookie = ({
  cookieOptions,
  cookiePreferenceKey = COOKIE_PREFERENCES_KEY,
  onPreferencesChanged,
}: Options) => {
  const defaultPreferences: CookiePreferences = {
    cookieOptions,
    isCustomised: false,
  };

  const setCookiePreferences = (cookiePreferences: CookiePreferences) => {
    const expires = getNextYear();
    document.cookie = `${cookiePreferenceKey}=${JSON.stringify(
      cookiePreferences,
    )}; expires=${expires}; path=/`;

    onPreferencesChanged(cookiePreferences);
    return cookiePreferences;
  };

  const getCookiePreferences = () => {
    const cookiePreferences = getCookie(cookiePreferenceKey);

    if (!cookiePreferences) return defaultPreferences;

    const policyIds = defaultPreferences.cookieOptions.map(cookieOption => cookieOption.id);
    const preferenceIds = cookiePreferences.cookieOptions.map(cookieOption => cookieOption.id);
    if (!policiesHaveChanged(policyIds, preferenceIds)) return cookiePreferences;

    const cookieOptions = mergePolicies(
      defaultPreferences.cookieOptions,
      cookiePreferences.cookieOptions,
    );

    return { cookieOptions, isCustomised: false };
  };

  return { getCookiePreferences, setCookiePreferences };
};

export default useCookie;
