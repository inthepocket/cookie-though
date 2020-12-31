import { h } from 'preact';
import { shallow } from 'enzyme';

import Button from '../../../components/button';

const defaultProps = {
  label: 'foo',
  onClick: jest.fn(),
};

describe('Button', () => {
  it('renders with a label', () => {
    const wrapper = shallow(<Button {...defaultProps} />);
    expect(wrapper.find('button').text()).toEqual('foo');
  });

  it('calls the correct function when clicked', () => {
    const wrapper = shallow(<Button {...defaultProps} />);
    wrapper.find('button').simulate('click');

    expect(defaultProps.onClick).toBeCalledTimes(1);
  });

  it('can render with a className prop', () => {
    const wrapper = shallow(<Button {...defaultProps} className="foo" />);
    expect(wrapper.hasClass('foo')).toBeTruthy();
  });
});
