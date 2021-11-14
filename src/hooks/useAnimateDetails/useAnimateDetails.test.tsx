import { fireEvent, waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/preact-hooks';
import MatchMediaMock from 'jest-matchmedia-mock';
import { FunctionComponent } from 'preact';
import { act } from 'preact/test-utils';

import defaultConfig from '../../config';
import { ContainerProvider } from '../../context/container';
import { createNewContainer } from '../../utils/container';
import { PREFERS_REDUCED_MOTION_NO_PREFERENCE } from '../usePrefersReducedMotion';
import useAnimateDetails, { getFloat } from '.';

const PREFERS_REDUCED_MOTION_REDUCE_QUERY = '(prefers-reduced-motion: reduce)';
const TRANSITION_TIME = 300;
const { ariaLabel } = defaultConfig;

const matchMedia = new MatchMediaMock();
jest.useFakeTimers();
jest.mock('../../hooks/useTransitionDuration', () => ({
  __esModule: true,
  default: () => TRANSITION_TIME,
  getTransitionTime: () => TRANSITION_TIME,
}));

describe('getFloat', () => {
  it('can get the height of an element', () => {
    const div = document.createElement('div');
    div.style.height = '10px';

    expect(getFloat(div, 'height')).toBe(10);
  });
});

describe('useAnimateDetails', () => {
  describe('The detailsRef contains a reference to null', () => {
    it('isOpen will be false', () => {
      const detailsRef = { current: null };
      const { container } = createNewContainer(ariaLabel);
      const wrapper: FunctionComponent = ({ children }) => (
        <ContainerProvider container={container} children={children} />
      );

      const { result } = renderHook(() => useAnimateDetails(detailsRef), { wrapper });

      expect(result.current?.isOpen).toBeFalsy();
    });
  });

  describe('The detailsRef contains a reference to a details element', () => {
    const cancelMock = jest.fn();
    const animateMock = jest.fn(() => ({ cancel: cancelMock } as unknown as Animation));
    const mockAnimate = (content: HTMLDivElement) => (content.animate = animateMock);

    const getDetailsRef = () => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      details.appendChild(summary);

      const content = document.createElement('div');
      mockAnimate(content);
      content.classList.add('content');
      details.appendChild(content);

      return { detailsRef: { current: details }, summary };
    };

    const setup = () => {
      const { detailsRef, summary } = getDetailsRef();
      const { container } = createNewContainer(ariaLabel);
      container.style.paddingBottom = '0px';
      container.appendChild(document.createElement('header'));
      container.appendChild(detailsRef.current);
      container.appendChild(document.createElement('div'));

      document.body.appendChild(container);

      return { container, detailsRef, summary };
    };

    describe('the user has prefers-reduced-motion: reduce', () => {
      beforeAll(() => matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_REDUCE_QUERY));

      afterAll(() => {
        matchMedia.clear();
        document.body.innerHTML = '';
      });

      it('will toggle the details element without animation', async () => {
        const { container, detailsRef, summary } = setup();
        const wrapper: FunctionComponent = ({ children }) => (
          <ContainerProvider container={container} children={children} />
        );
        const { result } = renderHook(() => useAnimateDetails(detailsRef), { wrapper });

        expect(result.current?.isOpen).toBeFalsy();

        await act(() => {
          fireEvent.click(summary);
        });

        expect(result.current?.isOpen).toBeTruthy();

        await act(() => {
          fireEvent.click(summary);
        });

        expect(result.current?.isOpen).toBeFalsy();
      });
    });

    describe('the user has prefers-reduced-motion: no-preference', () => {
      beforeAll(() => {
        matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_NO_PREFERENCE);
      });

      afterEach(() => {
        matchMedia.clear();
        document.body.innerHTML = '';
        jest.clearAllMocks();
      });

      /**
       * JSDOM does not support the Web Animations API;
       * In order to test the result of Animation.onfinish, we call onfinish manually.
       */
      const triggerOnFinish = async (index = 0) => {
        await waitFor(() => {
          const animation = animateMock.mock.results[index].value as Animation;
          expect(animation).toHaveProperty('onfinish');
          // @ts-expect-error onfinish is set within the hook
          animation.onfinish();
        });
      };

      const toggleSummary = async (summary: HTMLElement, index = 0) => {
        await act(() => {
          fireEvent.click(summary);
          jest.runAllTimers();
        });
        await triggerOnFinish(index);
      };

      it('will toggle the details element with an animation', async () => {
        const { container, detailsRef, summary } = setup();
        const wrapper: FunctionComponent = ({ children }) => (
          <ContainerProvider container={container} children={children} />
        );
        const { result } = renderHook(() => useAnimateDetails(detailsRef), { wrapper });

        // Open
        await toggleSummary(summary);

        expect(result.current?.isOpen).toBeTruthy();
        expect(detailsRef.current).not.toHaveAttribute('style');

        // Close
        await toggleSummary(summary, 1);

        expect(result.current?.isOpen).toBeFalsy();
        expect(detailsRef.current).not.toHaveAttribute('style');
      });

      describe('The wantedOffset is higher than the maxOffset', () => {
        let innerHeight: number;
        beforeAll(() => {
          matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_NO_PREFERENCE);
          innerHeight = global.innerHeight;
          global.innerHeight = -1;
        });

        afterAll(() => {
          matchMedia.clear();
          document.body.innerHTML = '';
          global.innerHeight = innerHeight;
        });

        it('will set an overflow on the content', async () => {
          const { container, detailsRef, summary } = setup();
          const wrapper: FunctionComponent = ({ children }) => (
            <ContainerProvider container={container} children={children} />
          );
          const { result } = renderHook(() => useAnimateDetails(detailsRef), { wrapper });

          await toggleSummary(summary);

          expect(result.current?.isOpen).toBeTruthy();
          expect(detailsRef.current.querySelector('.content')).toHaveStyle({ overflowY: 'scroll' });
        });
      });
    });
  });
});
