export type CookieOption = Policy & {
  isEnabled: boolean;
};

export enum Category {
  Essential = 'essential',
  Functional = 'functional',
  Statistics = 'statistics',
  Marketing = 'marketing',
}

export interface Policy {
  id: string;
  label: string;
  description: string;
  category: Category;
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
