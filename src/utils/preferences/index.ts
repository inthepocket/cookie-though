import { OnPreferencesChanged } from '../../context/onPreferencesChanged';
import { getNextYear } from '../date';
import { mapToCookie, Option, Preference } from '../mappers';

interface MergePreferencesParams {
  currentPreferences: Preference[];
  newPreferences: Preference[];
}

export const mergePreferences = ({
  newPreferences,
  currentPreferences,
}: MergePreferencesParams) => {
  return newPreferences.map(({ id }) => ({
    id,
    isEnabled: !!currentPreferences.find((preference) => preference.id === id)?.isEnabled,
  }));
};

type PreferencesHaveChangedParams = MergePreferencesParams;

export const preferencesHaveChanged = ({
  newPreferences,
  currentPreferences,
}: PreferencesHaveChangedParams) => {
  const newPreferenceIds = newPreferences.map(({ id }) => id);
  const currentPreferenceIds = currentPreferences.map(({ id }) => id);

  if (currentPreferenceIds.length !== newPreferenceIds.length) return true;

  return newPreferenceIds.reduce((havePreferencesChanged, preferenceId) => {
    if (havePreferencesChanged) return havePreferencesChanged;

    return !currentPreferenceIds.includes(preferenceId);
  }, false);
};

export const getPreferences = (cookiePreferencesKey: string) => {
  const rawCookies = decodeURIComponent(document.cookie).split(';');
  const preferences = rawCookies.reduce<string[] | undefined>((cookiePreferences, cookie) => {
    if (cookiePreferences) return cookiePreferences;

    const [key, value] = cookie.split('=');
    if (key.trim() === cookiePreferencesKey) return value.split('|');
  }, undefined);

  if (!preferences) {
    return undefined;
  }

  return preferences.map<Preference>((preference) => {
    const [id, isEnabled] = preference.split(':');
    return { id, isEnabled: !!+isEnabled };
  });
};

interface SetPreferencesParams {
  cookiePreferencesKey: string;
  options: Option[];
  onPreferencesChanged?: OnPreferencesChanged;
}

export const setPreferences = ({
  cookiePreferencesKey,
  options,
  onPreferencesChanged,
}: SetPreferencesParams) => {
  const cookiePreferencesValue = mapToCookie(options);
  const expires = `expires=${getNextYear()}`;
  const path = 'path=/';
  const sameSite = 'SameSite=strict';

  document.cookie = `${cookiePreferencesKey}=${cookiePreferencesValue};${expires};${path};${sameSite}`;

  if (onPreferencesChanged) {
    onPreferencesChanged({
      isCustomised: true,
      preferences: options.map(({ id, isEnabled }) => ({ id, isEnabled })),
    });
  }

  return options;
};
