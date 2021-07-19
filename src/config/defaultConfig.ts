import { Policy } from '../types';

export const defaultPolicies: Policy[] = [
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
  policies: defaultPolicies,
  essentialLabel: 'Always on',
  header: {
    subTitle: "You're probably fed up with these banners...",
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
};

export default defaultConfig;
