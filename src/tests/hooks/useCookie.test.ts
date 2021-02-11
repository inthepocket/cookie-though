import { formatToCookie } from './../../hooks/useCookie';
import { EventEmitter } from 'events';
import { CookiePreferences, CookiePreference } from './../../types';
import {
  COOKIE_PREFERENCES_CHANGED_EVENT,
  COOKIE_PREFERENCES_KEY,
  getCookie,
} from '../../hooks/useCookie';
import useCookie from '../../hooks/useCookie';
import mockConfig from '../__mocks__/config';
import clearCookies from '../utils/clearCookies';

describe('useCookie', () => {
  let cookieOptions: CookiePreference[];

  beforeEach(() => {
    cookieOptions = mockConfig.policies.map(policy => ({ id: policy.id, isEnabled: false }));
  });

  afterEach(() => {
    clearCookies();
  });

  it('can get the cookie preferences', () => {
    document.cookie = `cookie=value`;
    document.cookie = `cookie-preferences=${formatToCookie(cookieOptions)}`;
    document.cookie = `foo=bar`;
    const { getCookiePreferences } = useCookie({ cookieOptions, ee: new EventEmitter() });
    expect(getCookiePreferences()).toEqual({ isCustomised: true, cookieOptions });
  });

  it('can get the customised cookie preferences', () => {
    cookieOptions = cookieOptions.map(cookieOption => ({ ...cookieOption, isEnabled: true }));
    document.cookie = `cookie=value`;
    document.cookie = `cookie-preferences=${formatToCookie(cookieOptions)}`;
    const { getCookiePreferences } = useCookie({ cookieOptions, ee: new EventEmitter() });
    expect(getCookiePreferences()).toEqual({ isCustomised: true, cookieOptions });
  });

  it('will return the default preferences when initialised and getting the cookie preferences for the first time', () => {
    const { getCookiePreferences } = useCookie({ cookieOptions, ee: new EventEmitter() });
    expect(getCookiePreferences()).toEqual({ isCustomised: false, cookieOptions });
    expect(getCookie(COOKIE_PREFERENCES_KEY)).toBeUndefined();
  });

  it('will call the listener when the options are set', () => {
    const onPreferencesChanged = jest.fn((preferences: CookiePreferences) => {
      expect(preferences).toEqual({ isCustomised: true, cookieOptions });
    });
    const ee = new EventEmitter();
    const { setCookiePreferences } = useCookie({
      cookieOptions,
      ee,
    });
    ee.on(COOKIE_PREFERENCES_CHANGED_EVENT, onPreferencesChanged);
    setCookiePreferences({ isCustomised: true, cookieOptions });
    expect(getCookie(COOKIE_PREFERENCES_KEY)).toEqual({
      isCustomised: true,
      cookieOptions,
    });

    expect(onPreferencesChanged).toBeCalledTimes(1);
  });

  it('will not call the cookies_changed event when there is no event emitter', () => {
    const { setCookiePreferences } = useCookie({
      cookieOptions,
    });
    setCookiePreferences({ isCustomised: true, cookieOptions });
    expect(getCookie(COOKIE_PREFERENCES_KEY)).toEqual({
      isCustomised: true,
      cookieOptions,
    });
  });

  describe('when the policies get updated', () => {
    beforeEach(() => {
      document.cookie = `cookie-preferences=${formatToCookie(cookieOptions)}`;
    });

    it('will do nothing if the policy have remained the same', () => {
      const { getCookiePreferences } = useCookie({
        cookieOptions,
        ee: new EventEmitter(),
      });
      expect(getCookiePreferences()).toEqual({ cookieOptions, isCustomised: true });
    });

    it('will merge the preferences of the user with the new policies', () => {
      const newCookieOptions = [
        ...cookieOptions,
        {
          id: 'id',
          label: 'label',
          description: 'description',
          category: 'functional',
          isEnabled: false,
        },
      ];
      const { getCookiePreferences } = useCookie({
        cookieOptions: newCookieOptions,
        ee: new EventEmitter(),
      });
      expect(getCookiePreferences()).toEqual({
        cookieOptions: newCookieOptions,
        isCustomised: false,
      });
    });
  });

  describe('when the cookie is stored in a deprecated way', () => {
    it('will clear the cookie', () => {
      document.cookie = `${COOKIE_PREFERENCES_KEY}=${JSON.stringify({
        cookieOptions,
        isCustomised: true,
      })}`;
      const { getCookiePreferences } = useCookie({ cookieOptions });
      expect(getCookiePreferences()).toEqual({
        cookieOptions,
        isCustomised: false,
      });
      expect(getCookie(COOKIE_PREFERENCES_KEY)).toBeUndefined();
    });
  });
});
