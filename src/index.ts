// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

import './index.css';

import initCookieThough from './components/app';
import { CookieOption } from './components/customization/option';

const mockCookies: CookieOption[] = [
  {
    name: 'Functional cookies',
    description: 'We’ll remember the basics such as language.',
    isEnabled: false,
  },
  {
    name: 'Analytics',
    description: 'We’ll know where we should improve your experience.',
    isEnabled: false,
  },
  {
    name: 'Marketing',
    description: 'We’ll only show you content that interests you.',
    isEnabled: false,
  },
];

window.addEventListener('DOMContentLoaded', () => {
  initCookieThough({ manageId: 'manage-cookie-though', cookieOptions: mockCookies });
});
