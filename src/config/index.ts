import type { OnPreferencesChanged } from './../context/onPreferencesChanged/index';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

/**
 * The category to which a policy belongs to.
 */
export type Category =
  | 'essential'
  | 'social'
  | 'personalisation'
  | 'marketing'
  | 'statistics'
  | 'functional';

export interface Policy {
  /**
   * The id that is used to save the user's preferences in the cookie.
   *
   * Example: `functional`
   */
  id: string;
  /**
   * The label of the policy checkbox shown to the user in bold.
   *
   * Example: `Functional Cookies`
   */
  label: string;
  /**
   * The label of the policy checkbox shown to the user.
   *
   * Example: `We'll remember the basics such as language.`
   */
  description: string;
  /**
   * The category to which this policy belongs to.
   */
  category: Category;
}

export interface Config {
  /**
   * Announces the presence of a cookie banner to a user using a screenreader.
   *
   * Default: `Cookie Banner`.
   */
  ariaLabel?: string;
  /**
   * Announces a group of a cookie options to a user using a screenreader.
   *
   * Default: `Cookie options`.
   */
  optionsAriaLabel?: string;
  /**
   * An array of policies that are shown to the user.
   *
   * Default: a list of all possible policies.
   */
  policies: Policy[];
  /**
   * The label that is displayed instead of the checkbox for essential cookies.
   * Seeing as essential cookies can't be turned off, we display a label instead.
   *
   * Default:`Always on`.
   */
  essentialLabel?: string;
  /**
   * An object which contains the labels that are displayed to the user to accept (all) or decline cookies.
   */
  permissionLabels?: {
    accept?: string;
    acceptAll?: string;
    decline?: string;
  };
  /**
   * The key that is used for saving the cookie with the user's preferences.
   *
   * Default: `cookie-preferences`.
   */
  cookiePreferencesKey?: string;
  /**
   * An object which contains the labels that are displayed in the header.
   * In order for Cookie Though not to render one or more of these labels, pass `null` as the value.
   */
  header?: {
    /** Default: `You're probably fed up with these banners...` */
    intro?: string | null;
    /** Default: `cookie though?` */
    title?: string | null;
    /** Default: `Everybody wants to show his best side - and so do we. That's why we use cookies to guarantee you a better experience.` */
    description?: string | null;
  };
  /**
   * The label for the customize <summary> tag which opens and closes the cookie options.
   *
   * Default: `Customize`
   */
  customizeLabel?: string;
  /**
   * An object which contains a url and label which allow the user to read the full cookie policy.
   */
  cookiePolicy?: {
    url: string;
    label: string;
  };
  /**
   * A function which will be called whenever the preferences of the user change.
   */
  onPreferencesChanged?: OnPreferencesChanged;
}

const defaultPolicies: Policy[] = [
  {
    id: 'essential',
    label: 'Strictly necessary cookies',
    description: 'These cookies are required to run the site.',
    category: 'essential',
  },
  {
    id: 'functional',
    label: 'Functional cookies',
    description: "We'll remember the basics such as language.",
    category: 'functional',
  },
  {
    id: 'statistics',
    label: 'Statistics',
    description: "We'll know where we should improve your experience.",
    category: 'statistics',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: "We'll only show you ads you're interested in.",
    category: 'marketing',
  },
  {
    id: 'social',
    label: 'Social',
    description: 'This allows us to track your social activity',
    category: 'social',
  },
  {
    id: 'personalisation',
    label: 'Personalisation',
    description: "We'll only show you content that interests you.",
    category: 'personalisation',
  },
];

const defaultConfig = {
  ariaLabel: 'Cookie banner',
  optionsAriaLabel: 'Cookie options',
  policies: defaultPolicies,
  essentialLabel: 'Always on',
  header: {
    intro: "You're probably fed up with these banners...",
    title: 'cookie though?',
    description:
      "Everybody wants to show his best side - and so do we. That's why we use cookies to guarantee you a better experience.",
  },
  permissionLabels: {
    accept: 'Accept',
    acceptAll: 'Accept all',
    decline: 'Decline',
  },
  customizeLabel: 'Customize',
  cookiePreferencesKey: COOKIE_PREFERENCES_KEY,
};

export default defaultConfig;
