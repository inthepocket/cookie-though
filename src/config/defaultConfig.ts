import { Category, Policy } from '../types';

export const defaultPolicies: Policy[] = [
  {
    id: 'essential',
    label: 'Strictly necessary cookies',
    description: 'Always on',
    category: Category.Essential,
  },
  {
    id: 'functional',
    label: 'Functional cookies',
    description: 'We’ll remember the basics such as language.',
    category: Category.Functional,
  },
  {
    id: 'statistics',
    label: 'Statistics',
    description: 'We’ll know where we should improve your experience.',
    category: Category.Statistics,
  },
  {
    id: 'advertisement',
    label: 'Advertisement',
    description: "We'll only show you ads you're interested in.",
    category: Category.Advertisement,
  },
  {
    id: 'social',
    label: 'Social',
    description: 'This allows track your social activity on this site',
    category: Category.Social,
  },
  {
    id: 'personalisation',
    label: 'Personalisation',
    description: 'We’ll only show you content that interests you.',
    category: Category.Personalisation,
  },
];

const defaultConfig = {
  policies: defaultPolicies,
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
};

export default defaultConfig;
