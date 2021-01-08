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

      initCookieThough({ manageId: 'manage-cookie-though', cookieOptions: mockCookies });

      expect(document.querySelector('.cookie-though')).toBeDefined();
    });
  });

  it('will log an error if no manage button is present', () => {
    expect(() =>
      mount(
        <div className="cookie-though">
          <App manageId="manage-cookie-though" cookieOptions={mockCookies} />
        </div>,
        { attachTo: document.body },
      ),
    ).toThrowError();
  });

  describe('without user preferences stored in local storage', () => {
    it('should show the cookie wall', () => {
      const manageButton = document.createElement('button');
      manageButton.id = 'manage-cookie-though';
      document.body.append(manageButton);

      const wrapper = mount(
        <div className="cookie-though">
          <App manageId="manage-cookie-though" cookieOptions={mockCookies} />
        </div>,
        { attachTo: document.body },
      );

      const appRoot = wrapper.find('div').first();
      expect(appRoot.render().hasClass('visible')).toBeTruthy();
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
      const manageButton = document.createElement('button');
      manageButton.id = 'manage-cookie-though';
      document.body.append(manageButton);

      const wrapper = mount(
        <div className="cookie-though">
          <App manageId="manage-cookie-though" cookieOptions={mockCookies} />
        </div>,
        { attachTo: document.body },
      );

      const appRoot = wrapper.find('div').first();
      expect(appRoot.render().hasClass('visible')).toBeFalsy();
    });

    it("should show the cookie wall if the cookie preferences aren't customised", () => {
      const manageButton = document.createElement('button');
      manageButton.id = 'manage-cookie-though';
      document.body.append(manageButton);

      const wrapper = mount(
        <div className="cookie-though">
          <App manageId="manage-cookie-though" cookieOptions={mockCookies} />
        </div>,
        { attachTo: document.body },
      );

      const appRoot = wrapper.find('div').first();
      expect(appRoot.render().hasClass('visible')).toBeTruthy();
    });

    // TODO: localstorage
    it('should show the cookie wall when clicking the element with the manage id', () => {
      const manageButton = document.createElement('button');
      manageButton.id = 'manage-cookie-though';
      document.body.append(manageButton);

      const wrapper = mount(
        <div className="cookie-though">
          <App manageId="manage-cookie-though" cookieOptions={mockCookies} />
        </div>,
        { attachTo: document.body },
      );

      manageButton.click();
      wrapper.update();
      const appRoot = wrapper.find('div').first();
      expect(appRoot.render().hasClass('visible')).toBeTruthy();
    });
  });

  it('should render properly', () => {
    const wrapper = shallow(
      <body>
        <button id="manage-cookie-though"></button>
        <div className="cookie-though">
          <App manageId="manage-cookie-though" cookieOptions={mockCookies} />
        </div>
      </body>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
