import { h } from 'preact';
import toJson from 'enzyme-to-json';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { COOKIE_PREFERENCES_KEY, getCookie } from '../../../hooks/useCookie';
import mockConfig from '../../__mocks__/config';

import Button from '../../../components/button';
import Customization from '../../../components/customization';
import ToggleButton from '../../../components/customization/toggleButton';
import Collapse from '../../../components/customization/collapse';

const defaultProps = {
  cookieOptions: mockConfig.policies.map(policy => ({ ...policy, isEnabled: false })),
  permissionLabels: mockConfig.permissionLabels,
  setVisible: jest.fn(),
  setCookiePreferences: jest.fn(),
};

describe('Customization', () => {
  afterEach(() => {
    defaultProps.cookieOptions = mockConfig.policies.map(policy => ({
      ...policy,
      isEnabled: false,
    }));
  });
  it('should render properly', () => {
    const wrapper = shallow(<Customization {...defaultProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  const getToggleButton = (wrapper: ReactWrapper) => wrapper.find(ToggleButton).find('button');

  const isCustomizationCollapsed = (wrapper: ReactWrapper) => {
    return !wrapper.find(Collapse).prop('isOpen');
  };

  const getOptionalCookie = (wrapper: ReactWrapper) => wrapper.find('.option').at(1);

  test('clicking the ToggleButton component toggles the isActive state', () => {
    const wrapper = mount(<Customization {...defaultProps} />);
    const acceptButtonLabel = () => {
      return wrapper.find(Button).last().find('button').text();
    };

    getToggleButton(wrapper).simulate('click').update();
    expect(getToggleButton(wrapper).hasClass('active')).toBeTruthy();
    expect(isCustomizationCollapsed(wrapper)).toBeFalsy();
    expect(acceptButtonLabel()).toEqual('Accept');

    getToggleButton(wrapper).simulate('click').update();
    expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
    expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
    expect(acceptButtonLabel()).toEqual('Accept all');
  });

  test('clicking the Slider in an Option will toggle the isEnabled state for that option', () => {
    const wrapper = mount(<Customization {...defaultProps} />);
    const getOptionCheckbox = () => {
      return getOptionalCookie(wrapper).find('input').first();
    };

    getOptionCheckbox().simulate('click').update();
    expect(getOptionalCookie(wrapper).hasClass('enabled')).toBeTruthy();

    getOptionCheckbox().simulate('click').update();
    expect(getOptionalCookie(wrapper).hasClass('enabled')).toBeFalsy();
  });

  test('clicking the decline Button will decline all options and save the preferences', () => {
    const enabledCookies = mockConfig.policies.map(mockCookie => ({
      ...mockCookie,
      isEnabled: true,
    }));
    const setCookiePreferences = jest.fn();
    const wrapper = mount(
      <Customization
        {...defaultProps}
        cookieOptions={enabledCookies}
        setCookiePreferences={setCookiePreferences}
      />,
    );
    const declineButton = wrapper.find('button.secondary');

    declineButton.simulate('click').update();
    expect(setCookiePreferences).toBeCalledWith({
      isCustomised: true,
      cookieOptions: defaultProps.cookieOptions.map(cookieOption => ({
        id: cookieOption.id,
        isEnabled: false,
      })),
    });
    expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
    expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
    const optionalCookies = wrapper.find('.option').not('.optionSecondary');
    optionalCookies.forEach(optionalCookie => {
      expect(optionalCookie.hasClass('enabled')).toBeFalsy();
    });
  });

  describe('when clicking the accept button', () => {
    it('will only accept the options a user has enabled and save the preferences', () => {
      const customisedCookies = [
        defaultProps.cookieOptions[0],
        { ...defaultProps.cookieOptions[1], isEnabled: true },
        ...defaultProps.cookieOptions.filter((_, index) => ![0, 1].includes(index)),
      ];
      const setCookiePreferences = jest.fn();
      const wrapper = mount(
        <Customization
          {...defaultProps}
          cookieOptions={customisedCookies}
          setCookiePreferences={setCookiePreferences}
        />,
      );
      const acceptButton = wrapper.find('button').last();

      acceptButton.simulate('click').update();
      expect(setCookiePreferences).toBeCalledWith({
        isCustomised: true,
        cookieOptions: customisedCookies.map(customisedCookie => ({
          id: customisedCookie.id,
          isEnabled: customisedCookie.isEnabled,
        })),
      });
      expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
      expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
      expect(getOptionalCookie(wrapper).hasClass('enabled')).toBeTruthy();
      expect(defaultProps.setVisible).toBeCalledWith(false);
    });

    it('will accept all options if the user has none enabled and save the preferences', () => {
      const setCookiePreferences = jest.fn();
      const wrapper = mount(
        <Customization {...defaultProps} setCookiePreferences={setCookiePreferences} />,
      );
      const acceptButton = wrapper.find('button').last();

      acceptButton.simulate('click').update();
      expect(setCookiePreferences).toBeCalledWith({
        isCustomised: true,
        cookieOptions: defaultProps.cookieOptions.map(cookieOption => ({
          id: cookieOption.id,
          isEnabled: true,
        })),
      });
      expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
      expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
      const optionalCookies = wrapper.find('.option').not('.optionSecondary');
      optionalCookies.forEach(optionalCookie => {
        expect(optionalCookie.hasClass('enabled')).toBeTruthy();
      });
      expect(defaultProps.setVisible).toBeCalledWith(false);
    });
  });
});
