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
  permissionLabels: {
    accept: string;
    acceptAll: string;
    decline: string;
  };
  cookiePreferenceKey?: string;
  header?: {
    title?: string;
    subTitle?: string;
    description?: string;
  };
  cookiePolicy?: {
    url: string;
    label: string;
  };
}
