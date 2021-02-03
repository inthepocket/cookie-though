import { Policy } from '../../types';

export const dutchMockPolicies: Policy[] = [
  {
    id: 'essential',
    label: 'Strict noodzakelijke cookies',
    description: 'Altijd aan',
    category: 'essential',
  },
  {
    id: 'functional',
    label: 'Functionele cookies',
    description: 'We onthouden enkel de basisdingen, zoals taal.',
    category: 'functional',
  },
  {
    id: 'statistics',
    label: 'Statistieken',
    description: 'We zullen weten hoe we je ervaring kunnen verbeteren.',
    category: 'statistics',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'We zullen je enkel content tonen die je interesseert.',
    category: 'marketing',
  },
];

export const englishMockPolicies: Policy[] = [
  {
    id: 'essential',
    label: 'Strictly necessary cookies',
    description: 'Always on',
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
    description: 'We’ll only show you content that interests you.',
    category: 'marketing',
  },
];
