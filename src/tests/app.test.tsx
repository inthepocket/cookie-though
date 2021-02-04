import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { englishMockPolicies } from './__mocks__/policies';
import { COOKIE_PREFERENCES_KEY } from '../hooks/useCookie';
import { englishMockConfig } from './__mocks__/config';
import App from '../components/app';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

jest.mock('../utils/dom', () => ({
  setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
}));
import { setVisible } from '../utils/dom';

describe('Cookie Though', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ fontSize: '12px' }),
    });
  });

  beforeEach(() => {
    const manageCookiesElement = document.createElement('button');
    manageCookiesElement.id = 'manage-cookie-though';
    document.body.append(manageCookiesElement);
  });

  afterEach(() => {
    clearCookies();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  describe('without cookie preferences stored in a cookie', () => {
    it('should show the cookie wall', () => {
      mount(
        <div className="cookie-though">
          <App
            policies={englishMockConfig.policies}
            permissionLabels={englishMockConfig.permissionLabels}
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
      cookieOptions: englishMockConfig.policies.map(policy => ({ ...policy, isEnabled: false })),
    };

    it('should not show the cookie wall', () => {
      document.cookie = `${COOKIE_PREFERENCES_KEY}=${JSON.stringify({
        ...DEFAULT_COOKIE_PREFERENCES,
        isCustomised: true,
      })}`;
      mount(
        <div className="cookie-though">
          <App
            policies={englishMockPolicies}
            permissionLabels={englishMockConfig.permissionLabels}
          />
        </div>,
        { attachTo: document.body },
      );
    });

    it("should show the cookie wall if the cookie preferences aren't customised", () => {
      jest.mock('../utils/dom', () => ({
        setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
      }));
      mount(
        <div className="cookie-though">
          <App
            policies={englishMockPolicies}
            permissionLabels={englishMockConfig.permissionLabels}
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
            policies={englishMockPolicies}
            permissionLabels={englishMockConfig.permissionLabels}
          />
        </div>
      </body>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('if the user has a different browser font setting', () => {
    const renderApp = (fontSize: string) => {
      mount(
        <body>
          <button id="manage-cookie-though"></button>
          <div className="cookie-though" style={`:host(.cookie-though) {font-size: ${fontSize}}`}>
            <App
              policies={englishMockPolicies}
              permissionLabels={englishMockConfig.permissionLabels}
            />
          </div>
        </body>,
        { attachTo: document.body },
      );
    };
    it('should adjust the width with a large font', () => {
      const fontSize = '15px';
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({ fontSize }),
      });
      renderApp(fontSize);
      const container = document.querySelector('.cookie-though') as HTMLElement;
      expect(container.style.width).toEqual('400px');
    });

    it('should adjust the width with a very large font', () => {
      const fontSize = '18px';
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({ fontSize }),
      });
      renderApp(fontSize);
      const container = document.querySelector('.cookie-though') as HTMLElement;
      expect(container.style.width).toEqual('500px');
    });
  });
});
