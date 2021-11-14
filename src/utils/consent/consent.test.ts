import defaultConfig, { Policy } from '../../config';
import { Consent, mapToConsent, mapToPreferences, Option, Preference } from '../mappers';
import { setPreferences } from './../preferences';
import getConsent from '.';

const { policies, cookiePreferencesKey } = defaultConfig;

const DEFAULT_CONSENT: Consent = {
  isCustomised: false,
  options: [
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
  ],
};

const CUSTOMISED_CONSENT: Consent = {
  isCustomised: true,
  options: [
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
      isEnabled: true,
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
  ],
};

describe('getConsent', () => {
  describe('The user has not set his/her preferences', () => {
    it('will return the default consent', () => {
      expect(getConsent({ policies, cookiePreferencesKey })).toStrictEqual(DEFAULT_CONSENT);
    });
  });

  describe('The user has set his/her preferences', () => {
    interface Params {
      policies: Policy[];
      preferences: Preference[];
      isCustomised?: boolean;
    }

    const enableFunctionalPreference = (preferences: Preference[]) => {
      return preferences.map(({ id, isEnabled }) => {
        if (id === 'functional') return { id, isEnabled: true };

        return { id, isEnabled };
      });
    };

    const setInitialPreferences = ({ policies, preferences, isCustomised = false }: Params) => {
      const { options } = mapToConsent({ policies, preferences, isCustomised });
      setPreferences({ cookiePreferencesKey, options });
    };

    const clearPreferences = (cookiePreferencesKey: string) => {
      document.cookie = `${cookiePreferencesKey}= ; expires= Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    const getFunctionalOption = (options: Option[]) => {
      return options.find(({ category }) => category === 'functional');
    };

    describe('The preferences have not been changed', () => {
      beforeAll(() => {
        const preferences = mapToPreferences(policies);
        const customisedPreferences = enableFunctionalPreference(preferences);
        setInitialPreferences({ policies, preferences: customisedPreferences, isCustomised: true });
      });

      afterAll(() => clearPreferences(cookiePreferencesKey));

      it('will return the current consent', () => {
        expect(getConsent({ policies, cookiePreferencesKey })).toStrictEqual(CUSTOMISED_CONSENT);
      });
    });

    describe('The preferences have changed', () => {
      describe('The preferences have a different length', () => {
        beforeAll(() => {
          const preferences = mapToPreferences(policies);
          const customisedPreferences = enableFunctionalPreference(preferences);
          setInitialPreferences({
            policies,
            preferences: customisedPreferences,
            isCustomised: true,
          });
        });

        afterAll(() => clearPreferences(cookiePreferencesKey));

        it('will merge the preferences', () => {
          const newPolicies = policies.slice(0, -1);
          const consent = getConsent({ policies: newPolicies, cookiePreferencesKey });

          expect(consent.options).toHaveLength(newPolicies.length);
          expect(getFunctionalOption(consent.options)?.isEnabled).toBeTruthy();
        });
      });

      describe('The preferences have a different id', () => {
        beforeAll(() => {
          const preferences = mapToPreferences(policies);
          const customisedPreferences = enableFunctionalPreference(preferences);
          setInitialPreferences({
            policies,
            preferences: customisedPreferences,
            isCustomised: true,
          });
        });

        afterAll(() => clearPreferences(cookiePreferencesKey));

        it('will merge the preferences', () => {
          const newPolicies = policies.map((policy, index) => {
            return index === 2 ? { ...policy, id: 'some-id' } : policy;
          });
          const consent = getConsent({ policies: newPolicies, cookiePreferencesKey });

          expect(consent.options).toHaveLength(policies.length);
          expect(getFunctionalOption(consent.options)?.isEnabled).toBeTruthy();
          expect(consent.options[2].id).toBe('some-id');
        });
      });
    });
  });
});
