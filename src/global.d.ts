import { CookieOption } from './types';
import { CookiePreferences } from './components/app';
export {};
declare global {
  interface Window {
    cookieThough: {
      setVisible(value: boolean): void;
      getCookiePreferences?:
        | undefined
        | ((id?: CookieOption['id']) => CookiePreferences | CookieOption);
    };
  }
}
