import { Category } from './../../types';
import { Policy } from '../../types';

export const dutchMockPolicies: Policy[] = [
  {
    id: 'essential',
    label: 'Strict noodzakelijke cookies',
    description: 'Altijd aan',
    category: Category.Essential,
  },
  {
    id: 'functional',
    label: 'Functionele cookies',
    description: 'We onthouden de enkel basisdingen, zoals taal.',
    category: Category.Functional,
  },
  {
    id: 'analytics',
    label: 'Analyses',
    description: 'We zullen weten hoe we je ervaring kunnen verbeteren.',
    category: Category.Statistics,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'We zullen je enkel content tonen dat je interesseerd.',
    category: Category.Marketing,
  },
];

const mockPolicies: Policy[] = [
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
    id: 'analytics',
    label: 'Analytics',
    description: 'We’ll know where we should improve your experience.',
    category: Category.Statistics,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'We’ll only show you content that interests you.',
    category: Category.Marketing,
  },
];

export default mockPolicies;
