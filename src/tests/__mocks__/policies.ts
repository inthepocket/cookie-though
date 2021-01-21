import { Category } from './../../types';
import { Policy } from '../../types';

const mockPolicies: Policy[] = [
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
