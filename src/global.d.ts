import { Policy } from './types';
interface AdpcRequest {
  id: string;
  text: string;
}

export interface Consent {
  consent: Policy['category'][];
}

declare global {
  interface Window {
    cookieThough: {
      setVisible(value: boolean): void;
    };
  }

  interface Navigator {
    dataProtectionControl?: {
      request: (request: AdpcRequest[]) => Promise<Consent>;
    };
  }
}
