import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import mockPolicies from './__mocks__/policies';
import { COOKIE_PREFERENCES_KEY } from '../hooks/useCookie';
import mockConfig, { dutchMockConfig } from './__mocks__/config';
import CookieThough, { App } from '../components/app';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

describe('Cookie Though', () => {
  afterEach(() => {
    clearCookies();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  describe('init function', () => {
    beforeEach(() => {
      const manageCookiesElement = document.createElement('button');
      manageCookiesElement.id = 'manage-cookie-though';
      document.body.append(manageCookiesElement);
    });

    it('can render the app based on the initCookieThough function', () => {
      CookieThough.init(mockConfig);

      expect(document.querySelector('.cookie-though')).toBeDefined();
    });

    it('can switch the config', () => {
      CookieThough.init(mockConfig);

      let cookiePolicyLink = document.querySelector('a');
      expect(cookiePolicyLink?.text).toEqual(mockConfig.cookiePolicy.label);

      CookieThough.init(dutchMockConfig);
      expect(document.getElementsByClassName('cookie-though').length).toEqual(1);
      cookiePolicyLink = document.querySelector('a');
      expect(cookiePolicyLink?.text).toEqual(dutchMockConfig.cookiePolicy.label);
    });

    it('can hide the cookie wall with the setVisible function', () => {
      CookieThough.init(mockConfig);

      expect(document.querySelector('.cookie-though')).toBeDefined();
      expect(document.querySelector('.visible')).toBeDefined();
      window.cookieThough.setVisible(false);
      expect(document.querySelector('.visible')).toBeNull();
    });

    it('can get the current policies with the getCookiePreferences function', () => {
      CookieThough.init(mockConfig);
      expect(window.cookieThough.getPreferences()).toEqual({
        cookieOptions: [
          {
            id: 'functional',
            isEnabled: false,
          },
          {
            id: 'analytics',
            isEnabled: false,
          },
          {
            id: 'marketing',
            isEnabled: false,
          },
        ],
        isCustomised: false,
      });
    });

    it("can get a single preference based on it's id", () => {
      CookieThough.init(mockConfig);
      expect(window.cookieThough.getPreferences(mockPolicies[0].id)).toBeFalsy();
    });
  });

  describe('without user preferences stored in local storage', () => {
    it('should show the cookie wall', () => {
      const setVisible = jest.fn((value: boolean) => {
        expect(value).toBeTruthy();
      });
      mount(
        <div className="cookie-though">
          <App
            policies={mockConfig.policies}
            permissionLabels={mockConfig.permissionLabels}
            setVisible={setVisible}
          />
        </div>,
        { attachTo: document.body },
      );

      expect(setVisible).toBeCalled();
    });
  });

  describe('with user preferences stored in a cookie', () => {
    const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
      isCustomised: false,
      cookieOptions: mockConfig.policies.map(policy => ({ ...policy, isEnabled: false })),
    };

    it('should not show the cookie wall', () => {
      document.cookie = `${COOKIE_PREFERENCES_KEY}=${JSON.stringify({
        ...DEFAULT_COOKIE_PREFERENCES,
        isCustomised: true,
      })}`;
      const setVisible = function () {
        throw new Error('should not be called');
      };
      mount(
        <div className="cookie-though">
          <App
            policies={mockPolicies}
            permissionLabels={mockConfig.permissionLabels}
            setVisible={setVisible}
          />
        </div>,
        { attachTo: document.body },
      );
    });

    it("should show the cookie wall if the cookie preferences aren't customised", () => {
      const setVisible = jest.fn((value: boolean) => {
        expect(value).toBeTruthy();
      });

      mount(
        <div className="cookie-though">
          <App
            policies={mockPolicies}
            permissionLabels={mockConfig.permissionLabels}
            setVisible={setVisible}
          />
        </div>,
        { attachTo: document.body },
      );

      expect(setVisible).toBeCalled();
    });
  });

  it('should render properly', () => {
    const wrapper = shallow(
      <body>
        <button id="manage-cookie-though"></button>
        <div className="cookie-though">
          <App
            policies={mockPolicies}
            permissionLabels={mockConfig.permissionLabels}
            setVisible={() => {
              return;
            }}
          />
        </div>
      </body>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
