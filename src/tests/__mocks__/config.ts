import defaultConfig from '../../config/defaultConfig';
import { dutchMockPolicies, englishMockPolicies } from './policies';

export const englishMockConfig = {
  ...defaultConfig,
  policies: englishMockPolicies,
  cookiePolicy: {
    url: '#',
    label: 'Read the full cookie declaration',
  },
  experimental: {
    enableADPC: true,
  },
};

export const dutchMockConfig = {
  policies: dutchMockPolicies,
  essentialLabel: 'Altijd aan',
  header: {
    subTitle: 'Je hebt waarschijnlijk genoeg van deze banners...',
    title: 'cookie though?',
    description:
      'Iedereen wil zijn beste kant tonen - en wij ook. Daarom gebruiken we cookies om je een betere ervaring te garanderen',
  },
  customizeLabel: 'Pas aan',
  permissionLabels: {
    accept: 'Accepteer',
    acceptAll: 'Accepteer alle',
    decline: 'Wijs af',
  },
  cookiePolicy: {
    url: '#',
    label: 'Lees onze volledige cookie policy',
  },
};

export default defaultConfig;
