import { CookiePreference, CookiePreferences } from './types';

export {};
declare global {
  interface Window {
    cookieThough: {
      setVisible(value: boolean): void;
      getPreferences: (id?: CookiePreference['id']) => CookiePreferences | boolean;
    };
  }
}
