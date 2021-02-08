import { h } from 'preact';
import { mount, shallow } from 'enzyme';

import Collapse from '../../../components/customization/collapse';

describe('collapse', () => {
  it('can render in a collapsed state', () => {
    const wrapper = shallow(
      <Collapse isOpen={false} rootStyles={{ height: 1, bottom: 1 }}>
        <p></p>
      </Collapse>,
    );
    expect(wrapper.find('div').prop('aria-expanded')).toBeFalsy();
  });

  describe('rendering in an expanded state', () => {
    it('can render in an expanded state', () => {
      const wrapper = shallow(
        <Collapse isOpen={true} rootStyles={{ height: 0, bottom: 0 }}>
          <p></p>
        </Collapse>,
      );
      expect(wrapper.find('div').prop('aria-expanded')).toBeTruthy();
    });

    it('will render with an overflow: scroll if the collapse is too big', () => {
      const wrapper = mount(
        // jest's innerHeight is 768px, so forcing the height will force Collapse into scroll
        <Collapse isOpen={true} rootStyles={{ height: 1000, bottom: 0 }}>
          <p></p>
        </Collapse>,
      );
      expect(wrapper.find('div').prop('aria-expanded')).toBeTruthy();
      expect(getComputedStyle(wrapper.find('div').getDOMNode()).getPropertyValue('overflow')).toBe(
        'scroll',
      );
    });
  });
});
