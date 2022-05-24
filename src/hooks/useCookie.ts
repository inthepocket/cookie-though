import { CookiePreference, CookiePreferences } from '../types';
import { EventEmitter } from 'events';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';
export const COOKIE_PREFERENCES_CHANGED_EVENT = 'preferences_changed';

interface Options {
  cookieOptions: CookiePreference[];
  cookiePreferenceKey?: string;
  domain?: string;
  ee?: EventEmitter;
}

export const getCookie = (cookieKey: string) => {
  const rawCookies = decodeURIComponent(document.cookie).split(';');
  const currentPreferences = rawCookies.reduce<string[] | undefined>(
    (cookiePreferences, cookie) => {
      if (cookiePreferences) return cookiePreferences;

      const [key, value] = cookie.split('=');
      if (key.trim() === cookieKey) return value.split('|');
    },
    undefined,
  );

  if (!currentPreferences) {
    return undefined;
  }

  /*
    Clear old cookie preferences
  */
  if (currentPreferences[0].includes('cookieOptions')) {
    document.cookie = `${cookieKey}= ; expires= Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    return undefined;
  }

  return {
    isCustomised: true,
    cookieOptions: currentPreferences.map(preference => {
      const [id, isEnabled] = preference.split(':');
      return { id, isEnabled: !!+isEnabled };
    }),
  };
};

export const getNextYear = () => {
  const now = new Date();
  return new Date(now.setFullYear(now.getFullYear() + 1)).toUTCString();
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

export const formatToCookie = (cookiePreferences: CookiePreference[]) => {
  return cookiePreferences.reduce((formattedCookieValue, preference, i) => {
    return `${formattedCookieValue}${i !== 0 ? '|' : ''}${preference.id}:${
      preference.isEnabled ? '1' : '0'
    }`;
  }, '');
};

const useCookie = ({
  cookieOptions,
  domain,
  cookiePreferenceKey = COOKIE_PREFERENCES_KEY,
  ee,
}: Options) => {
  const setCookiePreferences = (cookiePreferences: CookiePreferences) => {
    const expires = getNextYear();
    document.cookie = `${cookiePreferenceKey}=${formatToCookie(
      cookiePreferences.cookieOptions,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    )}; expires=${expires}; path=/; SameSite=Strict;${domain ? `Domain=${domain}` : ''}`;
    if (ee) {
      ee.emit(COOKIE_PREFERENCES_CHANGED_EVENT, cookiePreferences);
    }
    return cookiePreferences;
  };

  return {
    getCookiePreferences: () => getCookiePreferences(cookieOptions, cookiePreferenceKey),
    setCookiePreferences,
  };
};

export default useCookie;
