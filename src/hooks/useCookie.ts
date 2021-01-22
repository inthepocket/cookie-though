import { CookieOption } from '../types';
import { CookiePreferences } from '../components/app';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

interface Options {
  cookieOptions: CookieOption[];
  cookiePreferenceKey?: string;
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
  policyIds: CookieOption['id'][],
  preferenceIds: CookieOption['id'][],
) => {
  return policyIds.some(id => !policyIds.includes(id)) || policyIds.length !== preferenceIds.length;
};

const mergePolicies = (policies: CookieOption[], preferences: CookieOption[]): CookieOption[] => {
  return policies.map(policy => {
    const isEnabled = preferences.reduce((isPreferenceEnabled, preference) => {
      return preference.id === policy.id ? preference.isEnabled : isPreferenceEnabled;
    }, false);

    return { ...policy, isEnabled };
  });
};

const useCookie = ({ cookieOptions, cookiePreferenceKey = COOKIE_PREFERENCES_KEY }: Options) => {
  const preferences: CookiePreferences = {
    cookieOptions,
    isCustomised: false,
  };

  const setCookiePreferences = (cookiePreferences: CookiePreferences) => {
    const expires = getNextYear();
    document.cookie = `${cookiePreferenceKey}=${JSON.stringify(
      cookiePreferences,
    )}; expires=${expires}; path=/`;

    return cookiePreferences;
  };

  const getCookiePreferences = () => {
    const cookiePreferences = getCookie(cookiePreferenceKey);

    if (!cookiePreferences) return setCookiePreferences(preferences);

    const policyIds = preferences.cookieOptions.map(cookieOption => cookieOption.id);
    const preferenceIds = cookiePreferences.cookieOptions.map(cookieOption => cookieOption.id);
    if (!policiesHaveChanged(policyIds, preferenceIds)) return cookiePreferences;

    const cookieOptions = mergePolicies(preferences.cookieOptions, cookiePreferences.cookieOptions);

    return { cookieOptions, isCustomised: false };
  };

  return { getCookiePreferences, setCookiePreferences };
};

export default useCookie;
