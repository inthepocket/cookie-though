import { h } from 'preact';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import mockCookies from '../../__mocks__/cookieOptions';

import Options from '../../../components/customization/options';
import Option from '../../../components/customization/option';

const defaultProps = {
  options: mockCookies,
  onToggle: jest.fn(),
};

describe('Option', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Options {...defaultProps} />);
    expect(wrapper.find(Option)).toHaveLength(3);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls the correct function when an option is toggled', () => {
    const onToggle = jest.fn();
    const wrapper = mount(<Options {...defaultProps} onToggle={onToggle} />);
    const option = wrapper.find(Option).first();
    option.find('button').simulate('click');

    expect(onToggle).toBeCalledTimes(1);
  });
});
