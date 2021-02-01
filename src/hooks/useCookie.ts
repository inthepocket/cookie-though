import { CookiePreference, CookiePreferences } from '../types';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

import { EventEmitter } from 'events';

interface Options {
  cookieOptions: CookiePreference[];
  cookiePreferenceKey?: string;
  ee?: EventEmitter;
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

export const getCookiePreferences = (options: CookiePreference[], cookiePreferenceKey: string) => {
  const defaultPreferences: CookiePreferences = {
    cookieOptions: options,
    isCustomised: false,
  };
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

const useCookie = ({
  cookieOptions,
  cookiePreferenceKey = COOKIE_PREFERENCES_KEY,
  ee,
}: Options) => {
  const setCookiePreferences = (cookiePreferences: CookiePreferences) => {
    const expires = getNextYear();
    document.cookie = `${cookiePreferenceKey}=${JSON.stringify(
      cookiePreferences,
    )}; expires=${expires}; path=/; SameSite=Strict`;
    if (ee) {
      ee.emit('cookies_changed', cookiePreferences);
    }
    return cookiePreferences;
  };

  return {
    getCookiePreferences: () => getCookiePreferences(cookieOptions, cookiePreferenceKey),
    setCookiePreferences,
  };
};

export default useCookie;
