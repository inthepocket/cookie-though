import { h } from 'preact';
import { mount, ReactWrapper, shallow } from 'enzyme';

import Collapse from '../../../components/customization/collapse';

describe('collapse', () => {
  const onWindowResize = jest.fn();

  const getStyleAttribute = (wrapper: ReactWrapper, selector: string, attribute: string) => {
    // @ts-expect-error: this is a helper function for enzyme
    // eslint-disable-next-line
    return wrapper.find(selector).getDOMNode().style._values[attribute] as string;
  };

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
      expect(getStyleAttribute(wrapper, '.ct-collapse', 'overflow')).toBe('scroll');
    });

    describe('when the window gets resized', () => {
      const wait = async (ms: number) => {
        return new Promise(resolve => {
          return setTimeout(resolve, ms);
        });
      };
      it('will resize to fit the new window properties', async () => {
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
        const collapsibleDiv = wrapper.find('div.ct-collapse');
        expect(collapsibleDiv.prop('aria-expanded')).toBeTruthy();
        const transition = () => getStyleAttribute(wrapper, 'div.ct-collapse', 'transition');
        expect(transition()).toBe('height 0ms ease-out');

        // Wait for the transition to be set again
        await wait(100);
        expect(transition()).toBe('height 250ms ease-out');

        // Wait for the scroll-behavior to be reset
        await wait(150);
        const scollBehavior = () =>
          getStyleAttribute(wrapper, 'div.ct-collapse', 'scroll-behavior');
        expect(scollBehavior()).toBeUndefined();
      });
    });
  });
});
