import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import mockConfig from '../../__mocks__/config';
import { Config } from '../../../types';

import Options from '../../../components/customization/options';
import Option from '../../../components/customization/option';

const defaultProps = {
  options: mockConfig.policies.map(policy => ({ ...policy, isEnabled: false })),
  onToggle: jest.fn(),
};

describe('Options', () => {
  it('can render without a cookie policy', () => {
    const wrapper = shallow(<Options {...defaultProps} />);
    expect(wrapper.find(Option)).toHaveLength(4);
    expect(wrapper.find('.declaration').exists()).toBeFalsy();
  });

  it('can render with a cookie policy', () => {
    const cookiePolicy: NonNullable<Config['cookiePolicy']> = {
      url: '#',
      label: 'Read the full cookie declaration',
    };
    const wrapper = shallow(<Options {...defaultProps} cookiePolicy={cookiePolicy} />);
    expect(wrapper.find(Option)).toHaveLength(4);
    expect(wrapper.find('.declaration').exists()).toBeTruthy();
  });

  it('calls the correct function when an option is toggled', () => {
    const onToggle = jest.fn();
    const wrapper = mount(<Options {...defaultProps} onToggle={onToggle} />);
    const option = wrapper.find(Option).first();
    option.find('input').simulate('click');

    expect(onToggle).toBeCalledTimes(1);
  });
});
