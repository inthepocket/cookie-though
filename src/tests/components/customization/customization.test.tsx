import { h } from 'preact';
import toJson from 'enzyme-to-json';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { Collapse } from 'react-collapse';
import mockCookies from '../../__mocks__/cookieOptions';

import Button from '../../../components/button';
import Customization from '../../../components/customization';
import Slider from '../../../components/customization/slider';
import ToggleButton from '../../../components/customization/toggleButton';
import { COOKIE_PREFERENCES_KEY } from '../../../hooks/useLocalStorage';

const defaultProps = {
  cookieOptions: mockCookies,
};

describe('Customization', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Customization {...defaultProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  afterEach(() => {
    defaultProps.cookieOptions = mockCookies.map(mockCookie => ({
      ...mockCookie,
      isEnabled: false,
    }));
  });

  const getToggleButton = (wrapper: ReactWrapper) => wrapper.find(ToggleButton).find('button');

  const isCustomizationCollapsed = (wrapper: ReactWrapper) => {
    return !wrapper.find(Collapse).prop('isOpened');
  };

  const getOptionalCookie = (wrapper: ReactWrapper) => wrapper.find('.option').at(1);

  const getCookiePreferences = () => {
    const cookiePreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    return cookiePreferences ? JSON.parse(cookiePreferences) : 'NO_PREFERENCES';
  };

  test('clicking the ToggleButton component toggles the isActive state', () => {
    const wrapper = mount(<Customization {...defaultProps} />);
    const acceptButtonLabel = () => {
      return wrapper
        .find(Button)
        .last()
        .find('button')
        .text();
    };

    getToggleButton(wrapper)
      .simulate('click')
      .update();
    expect(getToggleButton(wrapper).hasClass('active')).toBeTruthy();
    expect(isCustomizationCollapsed(wrapper)).toBeFalsy();
    expect(acceptButtonLabel()).toEqual('Accept');

    getToggleButton(wrapper)
      .simulate('click')
      .update();
    expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
    expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
    expect(acceptButtonLabel()).toEqual('Accept all');
  });

  test('clicking the Slider in an Option will toggle the isEnabled state for that option', () => {
    const wrapper = mount(<Customization {...defaultProps} />);
    const getSlider = () => {
      return getOptionalCookie(wrapper)
        .find(Slider)
        .find('button');
    };

    getSlider()
      .simulate('click')
      .update();
    expect(getOptionalCookie(wrapper).hasClass('enabled')).toBeTruthy();

    getSlider()
      .simulate('click')
      .update(),
      expect(getOptionalCookie(wrapper).hasClass('enabled')).toBeFalsy();
  });

  test('clicking the decline Button will decline all options and save the preferences', () => {
    const enabledCookies = mockCookies.map(mockCookie => ({ ...mockCookie, isEnabled: true }));
    const wrapper = mount(<Customization cookieOptions={enabledCookies} />);
    const declineButton = wrapper.find('button.secondary');

    declineButton.simulate('click').update();
    expect(getCookiePreferences()).toEqual({ isCustomised: true, cookieOptions: mockCookies });
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
        { ...mockCookies[0], isEnabled: true },
        ...mockCookies.splice(1, mockCookies.length),
      ];
      const wrapper = mount(<Customization cookieOptions={customisedCookies} />);
      const acceptButton = wrapper.find('button').last();

      acceptButton.simulate('click').update();
      expect(getCookiePreferences()).toEqual({
        isCustomised: true,
        cookieOptions: customisedCookies,
      });
      expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
      expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
      expect(getOptionalCookie(wrapper).hasClass('enabled')).toBeTruthy();
    });

    it('will accept all options if the user has none enabled and save the preferences', () => {
      const wrapper = mount(<Customization {...defaultProps} />);
      const acceptButton = wrapper.find('button').last();

      acceptButton.simulate('click').update();
      expect(getCookiePreferences()).toEqual({
        isCustomised: true,
        cookieOptions: mockCookies.map(mockCookie => ({ ...mockCookie, isEnabled: true })),
      });
      expect(getToggleButton(wrapper).hasClass('active')).toBeFalsy();
      expect(isCustomizationCollapsed(wrapper)).toBeTruthy();
      const optionalCookies = wrapper.find('.option').not('.optionSecondary');
      optionalCookies.forEach(optionalCookie => {
        expect(optionalCookie.hasClass('enabled')).toBeTruthy();
      });
    });
  });
});
