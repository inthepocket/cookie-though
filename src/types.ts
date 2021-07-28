export type CookiePreference = Pick<Policy, 'id'> & {
  isEnabled: boolean;
};

export interface CookiePreferences {
  isCustomised: boolean;
  cookieOptions: CookiePreference[];
}

export type CookieOption = Policy & {
  isEnabled: boolean;
};

export interface CookieOptions extends CookiePreferences {
  cookieOptions: CookieOption[];
}
export interface Policy {
  id: string;
  label: string;
  description: string;
  category: 'essential' | 'social' | 'personalisation' | 'marketing' | 'statistics' | 'functional';
}

export interface Config {
  policies: Policy[];
  essentialLabel?: string;
  permissionLabels: {
    accept: string;
    acceptAll: string;
    decline: string;
  };
  cookiePreferenceKey?: string;
  header: {
    title?: string;
    subTitle?: string;
    description: string;
  };
  customizeLabel: string;
  cookiePolicy?: {
    url: string;
    label: string;
  };
  experimental?: {
    enableADPC?: boolean;
  };
}
