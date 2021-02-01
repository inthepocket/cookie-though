/* eslint-disable @typescript-eslint/no-unused-vars */
import { h } from 'preact';
import { shallow, mount } from 'enzyme';

import { Policy } from '../../../types';
import Option from '../../../components/customization/option';

const defaultProps = (isEnabled: boolean) => ({
  option: {
    id: 'foo',
    label: 'foo',
    description: 'bar',
    category: 'essential' as Policy['category'],
    isEnabled,
  },
  onToggle: jest.fn(),
});

describe('Option', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Option {...defaultProps(false)} />);
    expect(wrapper.hasClass('ct-enabled')).toBeFalsy();
  });

  it('can render in an enabled state', () => {
    const wrapper = shallow(<Option {...defaultProps(true)} />);
    expect(wrapper.hasClass('ct-enabled')).toBeTruthy();
  });

  it('calls the correct function when clicked', () => {
    const onToggle = jest.fn();
    const wrapper = mount(<Option {...defaultProps(false)} onToggle={onToggle} />);
    wrapper.find('input').simulate('click');

    expect(onToggle).toBeCalledTimes(1);
  });
});
