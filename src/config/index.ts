import { OnPreferencesChanged } from './../context/onPreferencesChanged/index';

export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export type Category =
  | 'essential'
  | 'social'
  | 'personalisation'
  | 'marketing'
  | 'statistics'
  | 'functional';

export interface Policy {
  id: string;
  label: string;
  description: string;
  category: Category;
}

export interface Config {
  ariaLabel: string;
  optionsAriaLabel: string;
  policies: Policy[];
  essentialLabel?: string;
  permissionLabels: {
    accept: string;
    acceptAll: string;
    decline: string;
  };
  cookiePreferencesKey?: string;
  header: {
    intro?: string;
    title?: string;
    description: string;
  };
  customizeLabel: string;
  cookiePolicy?: {
    url: string;
    label: string;
  };
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
    description: 'We’ll remember the basics such as language.',
    category: 'functional',
  },
  {
    id: 'statistics',
    label: 'Statistics',
    description: 'We’ll know where we should improve your experience.',
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
    description: 'We’ll only show you content that interests you.',
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
