import mockPolicies, { dutchMockPolicies } from './policies';

export const dutchMockConfig = {
  policies: dutchMockPolicies,
  header: {
    subTitle: 'Je hebt waarschijnlijk genoeg van deze banners...',
    title: 'cookie though?',
    description:
      'Iedereen wil zijn beste kant tonen - en wij ook. Daarom gebruiken we cookies om je een betere ervaring te garanderen',
  },
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

const mockConfig = {
  policies: mockPolicies,
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
  cookiePolicy: {
    url: '#',
    label: 'Read the full cookie declaration',
  },
};

export default mockConfig;
