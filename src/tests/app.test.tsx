import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import mockCookies from './__mocks__/cookieOptions';

import initCookieThough, { App, CookiePreferences } from '../components/app';
import { COOKIE_PREFERENCES_KEY } from '../hooks/useLocalStorage';

describe('Cookie Though', () => {
  afterEach(() => {
    localStorage.clear();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  describe('init function', () => {
    it('can render the app based on the initCookieThough function', () => {
      const manageCookiesElement = document.createElement('button');
      manageCookiesElement.id = 'manage-cookie-though';
      document.body.append(manageCookiesElement);

      initCookieThough({ cookieOptions: mockCookies });

      expect(document.querySelector('.cookie-though')).toBeDefined();
    });
  });

  describe('without user preferences stored in local storage', () => {
    it('should show the cookie wall', () => {
      const setVisible = jest.fn((value: boolean) => {
        expect(value).toBeTruthy();
      });
      mount(
        <div className="cookie-though">
          <App cookieOptions={mockCookies} setVisible={setVisible} />
        </div>,
        { attachTo: document.body },
      );

      expect(setVisible).toBeCalled();
    });
  });

  describe('with user preferences stored in local storage', () => {
    const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
      isCustomised: false,
      cookieOptions: mockCookies,
    };

    it('should not show the cookie wall', () => {
      localStorage.setItem(
        COOKIE_PREFERENCES_KEY,
        JSON.stringify({ ...DEFAULT_COOKIE_PREFERENCES, isCustomised: true }),
      );
      const setVisible = function () {
        throw new Error('should not be called');
      };
      mount(
        <div className="cookie-though">
          <App cookieOptions={mockCookies} setVisible={setVisible} />
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
          <App cookieOptions={mockCookies} setVisible={setVisible} />
        </div>,
        { attachTo: document.body },
      );

      expect(setVisible).toBeCalled();
    });

    // TODO: localstorage
  });

  it('should render properly', () => {
    const wrapper = shallow(
      <body>
        <button id="manage-cookie-though"></button>
        <div className="cookie-though">
          <App
            cookieOptions={mockCookies}
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
