import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import mockPolicies from './__mocks__/policies';
import { COOKIE_PREFERENCES_KEY } from '../hooks/useCookie';
import mockConfig from './__mocks__/config';
import App from '../components/app';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

jest.mock('./utils/dom', () => ({
  setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
}));
import { setVisible } from '../utils/dom';

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
  });

  describe('without user preferences stored in local storage', () => {
    it('should show the cookie wall', () => {
      mount(
        <div className="cookie-though">
          <App policies={mockConfig.policies} permissionLabels={mockConfig.permissionLabels} />
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
      mount(
        <div className="cookie-though">
          <App policies={mockPolicies} permissionLabels={mockConfig.permissionLabels} />
        </div>,
        { attachTo: document.body },
      );
    });

    it("should show the cookie wall if the cookie preferences aren't customised", () => {
      jest.mock('./utils/dom', () => ({
        setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
      }));
      mount(
        <div className="cookie-though">
          <App policies={mockPolicies} permissionLabels={mockConfig.permissionLabels} />
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
          <App policies={mockPolicies} permissionLabels={mockConfig.permissionLabels} />
        </div>
      </body>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
