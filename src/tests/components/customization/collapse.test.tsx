import { h } from 'preact';
import { shallow } from 'enzyme';

import Collapse from '../../../components/customization/collapse';

describe('collapse', () => {
  it('can render in a collapsed state', () => {
    const wrapper = shallow(
      <Collapse isOpen={false}>
        <p></p>
      </Collapse>,
    );
    expect(wrapper.find('div').prop('aria-expanded')).toBeFalsy();
  });

  it('can render in an expanded state', () => {
    const wrapper = shallow(
      <Collapse isOpen={true}>
        <p></p>
      </Collapse>,
    );
    expect(wrapper.find('div').prop('aria-expanded')).toBeTruthy();
  });
});
