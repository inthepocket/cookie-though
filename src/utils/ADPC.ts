import { COOKIE_PREFERENCES_CHANGED_EVENT } from './../hooks/useCookie';
import { EventEmitter } from 'events';
import { Config } from '../types';

export const hasADPC = () => !!navigator.dataProtectionControl;

export const getADPCPreferences = (policies: Config['policies']) => {
  const request = policies.map(policy => ({
    id: policy.category,
    text: `${policy.category}: ${policy.description}`,
  }));

  return navigator
    .dataProtectionControl!.request(request)
    .then(({ consent }) => {
      return consent;
    })
    .catch(error => console.error(error));
};

export const useADPC = (policies: Config['policies'], ee: EventEmitter) => {
  const request = policies.map(policy => ({
    id: policy.category,
    text: `${policy.category}: ${policy.description}`,
  }));

  navigator
    .dataProtectionControl!.request(request)
    .then(({ consent }) => {
      return ee.emit(COOKIE_PREFERENCES_CHANGED_EVENT, {
        isCustomised: true,
        cookieOptions: policies.map(policy => ({
          id: policy.id,
          isEnabled: consent.indexOf(policy.category) !== -1,
        })),
      });
    })
    .catch(error => console.error(error));
};
