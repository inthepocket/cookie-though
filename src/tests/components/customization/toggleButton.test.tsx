import { h } from 'preact';
import { shallow } from 'enzyme';

import ToggleButton from '../../../components/customization/toggleButton';

const defaultProps = {
  label: 'Customize',
  isActive: false,
  toggleCustomization: jest.fn(),
};

describe('ToggleButton', () => {
  it('should render properly', () => {
    const wrapper = shallow(<ToggleButton {...defaultProps} />);
    expect(wrapper.hasClass('ct-active')).toBeFalsy();
  });

  it('should render properly in an active state', () => {
    const wrapper = shallow(<ToggleButton {...defaultProps} isActive={true} />);
    expect(wrapper.hasClass('ct-active')).toBeTruthy();
  });

  it('calls the correct function when clicked', () => {
    const toggleCustomization = jest.fn();
    const wrapper = shallow(
      <ToggleButton {...defaultProps} toggleCustomization={toggleCustomization} />,
    );
    wrapper.find('button').simulate('click');

    expect(toggleCustomization).toHaveBeenCalledTimes(1);
  });
});
