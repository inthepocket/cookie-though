import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { englishMockPolicies } from './__mocks__/policies';
import { COOKIE_PREFERENCES_KEY, formatToCookie } from '../hooks/useCookie';
import { englishMockConfig } from './__mocks__/config';
import App, {
  CONTAINER_BOTTOMS,
  CONTAINER_WIDTHS,
  MOBILE_CONTAINER_BOTTOMS,
} from '../components/app';
import clearCookies from './utils/clearCookies';
import { CookiePreferences } from '../types';

jest.mock('../utils/dom', () => ({
  setVisible: jest.fn().mockImplementation(() => 'You have called setVisible'),
}));
import { setVisible } from '../utils/dom';

describe('Cookie Though', () => {
  let container: HTMLDivElement;
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ fontSize: '12px', height: '0px', bottom: '0px' }),
    });
  });

  beforeEach(() => {
    const manageCookiesElement = document.createElement('button');
    manageCookiesElement.id = 'manage-cookie-though';
    document.body.append(manageCookiesElement);

    container = document.createElement('div');
    container.className = 'cookie-though';
    container.attachShadow({ mode: 'open' });

    const textDiv = document.createElement('div');
    textDiv.className = 'ct-banner-explanation';
    container.shadowRoot!.appendChild(textDiv);
    document.body.appendChild(container);
  });

  afterEach(() => {
    clearCookies();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  describe('without cookie preferences stored in a cookie', () => {
    it('should show the cookie wall', () => {
      mount(
        <App
          customizeLabel="customize"
          policies={englishMockConfig.policies}
          permissionLabels={englishMockConfig.permissionLabels}
        />,
        { attachTo: container },
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
      document.cookie = `${COOKIE_PREFERENCES_KEY}=${formatToCookie(
        DEFAULT_COOKIE_PREFERENCES.cookieOptions,
      )}`;
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

    it('should adjust the width and bottom of the container based on the font', () => {
      const fontSizes = [13.5, 15, 17, 19, 23];
      fontSizes.forEach((fontSize, i) => {
        mockGetComputedStyle(fontSize);
        renderApp(`${fontSize}px`);
        const container = document.querySelector('.cookie-though') as HTMLElement;
        switch (i) {
          case 2:
            expect(container.style.width).toEqual(CONTAINER_WIDTHS[2]);
            expect(container.style.bottom).toEqual(CONTAINER_BOTTOMS[1]);
            break;
          case 3:
            expect(container.style.width).toEqual(CONTAINER_WIDTHS[3]);
            expect(container.style.bottom).toEqual(CONTAINER_BOTTOMS[2]);
            break;
          case 4:
            expect(container.style.width).toEqual(CONTAINER_WIDTHS[3]);
            expect(container.style.bottom).toEqual(CONTAINER_BOTTOMS[3]);
            break;
          default:
            expect(container.style.width).toEqual(CONTAINER_WIDTHS[i]);
            expect(container.style.bottom).toEqual(CONTAINER_BOTTOMS[i]);
        }
      });
    });

    it('should not adjust the width of the container if the width is smaller than the breakpoint', () => {
      global.innerWidth = 375;
      const fontSizes = [13.5, 15, 17, 19, 23];
      fontSizes.forEach(fontSize => {
        mockGetComputedStyle(fontSize);
        renderApp(`${fontSize}px`);
        const container = document.querySelector('.cookie-though') as HTMLElement;
        expect(container.style.width).toBe('');
      });
    });

    it('should set the bottom attribute if the width is smaller than the breakpoint and the font size is large', () => {
      const fontSizes = [17, 19, 23];
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
