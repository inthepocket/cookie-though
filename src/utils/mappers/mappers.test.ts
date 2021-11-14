import defaultConfig from '../../config';
import { mapToConsent, mapToCookie, mapToPreferences, Preference } from '.';

const DEFAULT_OPTIONS = [
  {
    category: 'essential',
    description: 'These cookies are required to run the site.',
    id: 'essential',
    isEnabled: true,
    label: 'Strictly necessary cookies',
  },
  {
    category: 'functional',
    description: 'We’ll remember the basics such as language.',
    id: 'functional',
    isEnabled: false,
    label: 'Functional cookies',
  },
  {
    category: 'statistics',
    description: 'We’ll know where we should improve your experience.',
    id: 'statistics',
    isEnabled: false,
    label: 'Statistics',
  },
  {
    category: 'marketing',
    description: "We'll only show you ads you're interested in.",
    id: 'marketing',
    isEnabled: false,
    label: 'Marketing',
  },
  {
    category: 'social',
    description: 'This allows us to track your social activity',
    id: 'social',
    isEnabled: false,
    label: 'Social',
  },
  {
    category: 'personalisation',
    description: 'We’ll only show you content that interests you.',
    id: 'personalisation',
    isEnabled: false,
    label: 'Personalisation',
  },
];

const CUSTOMISED_OPTIONS = DEFAULT_OPTIONS.map((option) => {
  if (option.category === 'functional') return { ...option, isEnabled: true };

  return option;
});

const DEFAULT_COOKIE_VALUE =
  'essential:1|functional:0|statistics:0|marketing:0|social:0|personalisation:0';

describe('mapToConsent', () => {
  describe('The user has not customised his/her cookie preferences', () => {
    it('will return the default consent', () => {
      const { policies } = defaultConfig;
      const preferences = mapToPreferences(policies);

      const { options, isCustomised } = mapToConsent({
        policies,
        preferences,
        isCustomised: false,
      });

      expect(options).toEqual(DEFAULT_OPTIONS);
      expect(isCustomised).toBeFalsy();
    });
  });

  describe('The user has customised his/her cookie preferences', () => {
    const enableFunctionalPreference = (preferences: Preference[]) => {
      return preferences.map(({ id, isEnabled }) => {
        if (id === 'functional') return { id, isEnabled: true };

        return { id, isEnabled };
      });
    };

    it('will return the customised consent', () => {
      const { policies } = defaultConfig;
      const preferences = mapToPreferences(policies);
      const customisedPreferences = enableFunctionalPreference(preferences);

      const { options, isCustomised } = mapToConsent({
        policies,
        preferences: customisedPreferences,
        isCustomised: true,
      });

      expect(options).toEqual(CUSTOMISED_OPTIONS);
      expect(isCustomised).toBeTruthy();
    });
  });
});

describe('mapToPreferences', () => {
  it('will return preferences', () => {
    const { policies } = defaultConfig;

    expect(mapToPreferences(policies)).toStrictEqual([
      { id: 'essential', isEnabled: true },
      { id: 'functional', isEnabled: false },
      { id: 'statistics', isEnabled: false },
      { id: 'marketing', isEnabled: false },
      { id: 'social', isEnabled: false },
      { id: 'personalisation', isEnabled: false },
    ]);
  });
});

describe('mapToCookie', () => {
  it('will return the cookie preferences string', () => {
    const { policies } = defaultConfig;
    const preferences = mapToPreferences(policies);
    const { options } = mapToConsent({ policies, preferences, isCustomised: false });

    expect(mapToCookie(options)).toBe(DEFAULT_COOKIE_VALUE);
  });
});
