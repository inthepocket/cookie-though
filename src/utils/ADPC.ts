import { Config, CookiePreferences } from '../types';

export const hasADPC = () => !!navigator.dataProtectionControl;

export const useADPC = async (policies: Config['policies']): Promise<CookiePreferences> => {
  const request = policies.map(policy => ({
    id: policy.category,
    text: `${policy.category}: ${policy.description}`,
  }));

  const { consent } = await navigator.dataProtectionControl!.request(request);

  return {
    isCustomised: true,
    cookieOptions: policies.map(policy => ({
      id: policy.id,
      isEnabled: consent.indexOf(policy.category) !== -1,
    })),
  };
};
