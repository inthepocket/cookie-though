import { h } from 'preact';
import { shallow } from 'enzyme';

import Slider from '../../../components/customization/slider';

const defaultProps = {
  isEnabled: false,
  onToggle: jest.fn(),
};

describe('Slider', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Slider {...defaultProps} />);
    expect(wrapper.find('button').hasClass('enabled')).toBeFalsy();
  });

  it('can render in an enabled state', () => {
    const wrapper = shallow(<Slider {...defaultProps} isEnabled={true} />);
    expect(wrapper.find('button').hasClass('enabled')).toBeTruthy();
  });

  it('calls the correct function when clicked', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Slider {...defaultProps} onToggle={onToggle} />);
    wrapper.find('button').simulate('click');

    expect(onToggle).toBeCalledTimes(1);
  });
});
