import { h } from 'preact';
import { mount, shallow } from 'enzyme';

import Collapse from '../../../components/customization/collapse';

describe('collapse', () => {
  const onWindowResize = jest.fn();
  it('can render in a collapsed state', () => {
    const wrapper = shallow(
      <Collapse isOpen={false} onWindowResize={onWindowResize}>
        <p></p>
      </Collapse>,
    );
    expect(wrapper.find('div').prop('aria-expanded')).toBeFalsy();
  });

  describe('rendering in an expanded state', () => {
    it('can render in an expanded state', () => {
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({ height: '0px', bottom: '0px' }),
      });
      const wrapper = mount(
        <div className="visible">
          <Collapse isOpen={true} onWindowResize={onWindowResize}>
            <p></p>
          </Collapse>
          <div class="ct-acceptance"></div>
        </div>,
      );
      expect(wrapper.find(Collapse).prop('isOpen')).toBeTruthy();
    });

    it('will only set the initialHeight when expand is called the first time', () => {
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({ height: '0px', bottom: '0px' }),
      });
      const wrapper = mount(
        <div className="visible">
          <Collapse isOpen={true} onWindowResize={onWindowResize}>
            <p></p>
          </Collapse>
          <div class="ct-acceptance"></div>
        </div>,
      );
      expect(wrapper.find(Collapse).prop('isOpen')).toBeTruthy();
      wrapper.update();

      global.dispatchEvent(new Event('resize'));
      wrapper.update();
    });

    it('will render with an overflow: scroll if the collapse is too big', () => {
      // Setting innerHeight to minus will make it overflow
      global.innerHeight = -1;
      const wrapper = mount(
        <div className="visible">
          <Collapse isOpen={true} onWindowResize={onWindowResize}>
            <p></p>
          </Collapse>
        </div>,
      );
      expect(wrapper.find('div.ct-collapse').prop('aria-expanded')).toBeTruthy();
      // @ts-expect-error: can't use computed style as we need it for the mock
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(wrapper.find('.ct-collapse').getDOMNode().style._values.overflow).toBe('scroll');
    });

    describe('when the window gets resized', () => {
      it('will resize to fit the new window properties', () => {
        global.innerHeight = 600;
        const onWindowResize = jest.fn();
        const wrapper = mount(
          <div className="visible">
            <Collapse isOpen={true} onWindowResize={onWindowResize}>
              <p></p>
            </Collapse>
          </div>,
        );
        expect(wrapper.find('div.ct-collapse').prop('aria-expanded')).toBeTruthy();

        // Simulate a resize event
        global.dispatchEvent(new Event('resize'));
        expect(onWindowResize).toBeCalledTimes(1);
        expect(wrapper.find('div.ct-collapse').prop('aria-expanded')).toBeTruthy();
      });
    });
  });
});
