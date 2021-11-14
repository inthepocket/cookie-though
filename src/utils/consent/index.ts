import { Policy } from '../../config';
import { Consent, mapToConsent, mapToPreferences } from '../mappers';
import { getPreferences, mergePreferences, preferencesHaveChanged } from '../preferences';

interface Params {
  policies: Policy[];
  cookiePreferencesKey: string;
}

const getConsent = ({ policies, cookiePreferencesKey }: Params): Consent => {
  const currentPreferences = getPreferences(cookiePreferencesKey);
  const newPreferences = mapToPreferences(policies);
  const defaultConsent = mapToConsent({
    policies,
    preferences: newPreferences,
    isCustomised: false,
  });

  if (!currentPreferences) return defaultConsent;

  if (!preferencesHaveChanged({ newPreferences, currentPreferences })) {
    return mapToConsent({
      policies,
      preferences: currentPreferences,
      isCustomised: true,
    });
  }

  return mapToConsent({
    policies,
    preferences: mergePreferences({ newPreferences, currentPreferences }),
    isCustomised: false,
  });
};

export default getConsent;
