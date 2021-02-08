import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { englishMockPolicies } from './__mocks__/policies';
import { COOKIE_PREFERENCES_KEY } from '../hooks/useCookie';
import { englishMockConfig } from './__mocks__/config';
import App, { CONTAINER_WIDTHS, MOBILE_CONTAINER_BOTTOMS } from '../components/app';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

jest.mock('../utils/dom', () => ({
  setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
}));
import { setVisible } from '../utils/dom';

describe('Cookie Though', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ fontSize: '12px', height: '0px', bottom: '0px' }),
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
            customizeLabel="customize"
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
            customizeLabel="customize"
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
            customizeLabel="customize"
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
            customizeLabel="customize"
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
      const container = document.createElement('div');
      container.className = 'cookie-though';
      container.style.fontSize = fontSize;
      document.body.prepend(container);
      return mount(
        <App
          customizeLabel="customize"
          policies={englishMockPolicies}
          permissionLabels={englishMockConfig.permissionLabels}
        />,
        { attachTo: container },
      );
    };

    const mockGetComputedStyle = (size: number) => {
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({ fontSize: `${size}px`, height: '0px', bottom: '0px' }),
      });
    };

    it('should adjust the width of the container based on the font', () => {
      const fontSizes = [13.5, 15, 17, 19];
      fontSizes.forEach((fontSize, i) => {
        mockGetComputedStyle(fontSize);
        renderApp(`${fontSize}px`);
        const container = document.querySelector('.cookie-though') as HTMLElement;
        expect(container.style.width).toEqual(CONTAINER_WIDTHS[i]);
      });
    });

    it('should not adjust the width of the container if the width is smaller than the breakpoint', () => {
      global.innerWidth = 375;
      const fontSizes = [13.5, 15, 17, 19];
      fontSizes.forEach(fontSize => {
        mockGetComputedStyle(fontSize);
        renderApp(`${fontSize}px`);
        const container = document.querySelector('.cookie-though') as HTMLElement;
        expect(container.style.width).toBe('');
      });
    });

    it('should set the bottom attribute if the width is smaller than the breakpoint and the font size is large', () => {
      const fontSizes = [17, 19];
      global.innerWidth = 375;
      fontSizes.forEach((fontSize, i) => {
        mockGetComputedStyle(fontSize);
        renderApp(`${fontSize}px`);
        const container = document.querySelector('.cookie-though') as HTMLElement;
        expect(container.style.bottom).toEqual(MOBILE_CONTAINER_BOTTOMS[i]);
      });
    });
  });
});
