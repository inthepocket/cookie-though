import { Policy } from '../types';

export const isEssential = (category: Policy['category']) => category === 'essential';
