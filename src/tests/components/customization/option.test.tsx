import { h } from 'preact';
import { shallow, mount } from 'enzyme';

import Option from '../../../components/customization/option';

const defaultProps = (isEnabled: boolean) => ({
  option: {
    name: 'foo',
    description: 'bar',
    isEnabled,
  },
  onToggle: jest.fn(),
});

describe('Option', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Option {...defaultProps(false)} />);
    expect(wrapper.hasClass('enabled')).toBeFalsy();
  });

  it('can render in an enabled state', () => {
    const wrapper = shallow(<Option {...defaultProps(true)} />);
    expect(wrapper.hasClass('enabled')).toBeTruthy();
  });

  it('calls the correct function when clicked', () => {
    const onToggle = jest.fn();
    const wrapper = mount(<Option {...defaultProps(false)} onToggle={onToggle} />);
    wrapper.find('button').simulate('click');

    expect(onToggle).toBeCalledTimes(1);
  });
});