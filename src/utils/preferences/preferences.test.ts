import defaultConfig from '../../config';
import { getNextYear } from '../date';
import { Option, Preference } from '../mappers';
import { getPreferences, mergePreferences, preferencesHaveChanged, setPreferences } from '.';

const currentPreferences: Preference[] = [
  { id: 'essential', isEnabled: true },
  { id: 'functional', isEnabled: true },
];

const { cookiePreferencesKey } = defaultConfig;

const options: Option[] = [
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
];

const clearCookies = () => {
  document.cookie = `${cookiePreferencesKey}=; expires=1 Jan 1970 00:00:00 GMT`;
};

describe('mergePreferences', () => {
  it('will merge preferences', () => {
    const newPreferences: Preference[] = [
      { id: 'essential', isEnabled: true },
      { id: 'functional', isEnabled: false },
      { id: 'statistics', isEnabled: false },
    ];

    expect(mergePreferences({ newPreferences, currentPreferences })).toStrictEqual([
      { id: 'essential', isEnabled: true },
      { id: 'functional', isEnabled: true },
      { id: 'statistics', isEnabled: false },
    ]);
  });
});

describe('preferencesHaveChanged', () => {
  describe('The new preferences have a different length', () => {
    it('will return true', () => {
      const newPreferences = [...currentPreferences, { id: 'statistics', isEnabled: false }];

      expect(preferencesHaveChanged({ newPreferences, currentPreferences })).toBeTruthy();
    });
  });

  describe('The new preferences have a new id', () => {
    it('will return true', () => {
      // Clone the array of objects by value
      const newPreferences = currentPreferences.map((preference) => ({ ...preference }));
      newPreferences[1].id = 'statistics';

      expect(preferencesHaveChanged({ newPreferences, currentPreferences })).toBeTruthy();
    });
  });

  describe('The preferences have not changed', () => {
    it('will return false', () => {
      const newPreferences = currentPreferences;

      expect(preferencesHaveChanged({ newPreferences, currentPreferences })).toBeFalsy();
    });
  });
});

describe('setPreferences', () => {
  afterAll(clearCookies);

  it('can set the preferences of the user', () => {
    setPreferences({ cookiePreferencesKey, options });

    expect(document.cookie).toBe(`${cookiePreferencesKey}=essential:1|functional:1`);
  });

  describe('an onPreferencesChanged callback was provided', () => {
    it('can set the preferences of the user and call onPreferencesChanged', () => {
      const onPreferencesChanged = jest.fn();
      setPreferences({ cookiePreferencesKey, options, onPreferencesChanged });

      expect(document.cookie).toBe(`${cookiePreferencesKey}=essential:1|functional:1`);
      expect(onPreferencesChanged).toHaveBeenCalledTimes(1);
    });
  });
});

describe('getPreferences', () => {
  describe('The user has not set any preferences', () => {
    it('will return undefined', () => {
      expect(getPreferences(cookiePreferencesKey)).toBeUndefined();
    });
  });

  describe('The user has set preferences', () => {
    beforeAll(() => setPreferences({ cookiePreferencesKey, options }));

    afterAll(clearCookies);

    const preferences = options.map(({ id, isEnabled }) => ({ id, isEnabled }));

    it('will return the users preferences', () => {
      expect(getPreferences(cookiePreferencesKey)).toStrictEqual(preferences);
    });
  });

  describe('The user has set preferences and another cookie', () => {
    beforeAll(() => {
      setPreferences({ cookiePreferencesKey, options });
      document.cookie = `another-cookie=;expires=${getNextYear()};path=/;SameSite=strict`;
    });

    afterAll(clearCookies);

    it('will return the users preferences', () => {
      const preferences = options.map(({ id, isEnabled }) => ({ id, isEnabled }));
      expect(getPreferences(cookiePreferencesKey)).toStrictEqual(preferences);
    });
  });
});
