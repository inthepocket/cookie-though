import type { Category, Policy } from '../../config';

export const isEssential = (category: Category) => category === 'essential';

export interface Preference {
  id: Policy['id'];
  isEnabled: boolean;
}

interface MapToConsentParams {
  policies: Policy[];
  preferences: Preference[];
  isCustomised: boolean;
}

export type Option = Policy & Preference;

export interface Consent {
  isCustomised: boolean;
  options: Option[];
}

export const mapToConsent = ({
  policies,
  preferences,
  isCustomised,
}: MapToConsentParams): Consent => {
  const options = policies.map<Option>((policy) => {
    const isEnabled = !!preferences.find(({ id }) => id === policy.id)?.isEnabled;

    return { ...policy, isEnabled };
  });

  return { options, isCustomised };
};

export const mapToPreferences = (policies: Policy[]) => {
  return policies.map<Preference>(({ id, category }) => {
    return { id, isEnabled: isEssential(category) };
  });
};

export const mapToCookie = (options: Option[]) => {
  return options.reduce((cookieValue, { id, isEnabled }, i) => {
    const seperator = i !== 0 ? '|' : '';

    return `${cookieValue}${seperator}${id}:${+isEnabled}`;
  }, '');
};
