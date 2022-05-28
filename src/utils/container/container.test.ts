import MatchMediaMock from 'jest-matchmedia-mock';

import defaultConfig from '../../config';

import {
  CONTAINER_CLASS,
  createNewContainer,
  getContainer,
  getHiddenContainerBottom,
  toggleContainer,
} from '.';

const { ariaLabel } = defaultConfig;
const TRANSITION_TIME = 300;

new MatchMediaMock();
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.mock('../../hooks/useTransitionDuration', () => ({
  __esModule: true,
  default: () => TRANSITION_TIME,
  getTransitionTime: () => TRANSITION_TIME,
}));

describe('createNewContainer', () => {
  it('will create a new container with an accessible label and attached shadow root', () => {
    const { container, shadowRoot } = createNewContainer(ariaLabel);

    expect(container).toHaveAccessibleName(ariaLabel);
    expect(container).toHaveClass(CONTAINER_CLASS);
    expect(container.shadowRoot).toBe(shadowRoot);
  });
});

describe('getContainer', () => {
  describe('The container is not rendered', () => {
    it('will return null', () => {
      expect(getContainer()).toBeNull();
    });
  });

  describe('The container is rendered', () => {
    it('will return the container', () => {
      const { container } = createNewContainer(ariaLabel);
      document.body.appendChild(container);

      expect(getContainer()).toBe(container);
    });
  });
});

describe('getHiddenContainerBottom', () => {
  it('will return the hidden container bottom value', () => {
    const { container } = createNewContainer(ariaLabel);

    expect(getHiddenContainerBottom(container)).toBe('-0px');
  });
});

describe('toggleContainer', () => {
  const BOTTOM = '-100px';
  const { container } = createNewContainer(ariaLabel);
  const setup = () => document.body.appendChild(container);
  const teardown = () => (document.body.innerHTML = '');

  describe('The container is present in the DOM', () => {
    describe('the container should become visible', () => {
      beforeAll(setup);

      afterAll(teardown);

      it('will show the container', () => {
        toggleContainer(true, BOTTOM);

        expect(getContainer()).toHaveAttribute('aria-hidden', 'false');
        expect(getContainer()).toHaveStyle({ bottom: BOTTOM });
      });
    });

    describe('the container should become hidden', () => {
      beforeAll(setup);

      afterAll(teardown);

      it('will hide the container', () => {
        toggleContainer(false, BOTTOM);

        // Validate the container is hidden with the given bottom value
        expect(getContainer()).toHaveAttribute('aria-hidden', 'true');
        expect(getContainer()).toHaveStyle({ bottom: BOTTOM });
        expect(setTimeout).toHaveBeenCalledTimes(1);

        // Run the timer
        jest.runOnlyPendingTimers();

        // Validate the container bottom has been updated with the closed bottom value
        expect(getContainer()).toHaveStyle({ bottom: '-0px' });
      });
    });
  });

  describe('The container is not present in the DOM', () => {
    it('will initialise the application', () => {
      toggleContainer(true);

      expect(getContainer()).toHaveStyle({ bottom: '-0px' });
    });
  });
});
