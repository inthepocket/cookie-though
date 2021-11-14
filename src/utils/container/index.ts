import { getFloat } from '../../hooks/useAnimateDetails';
import { getTransitionTime } from '../../hooks/useTransitionDuration';
import { init } from '../../lib';
import inlineCSS from '../css';

export const CONTAINER_CLASS = 'cookie-though';

const createNewContainer = (ariaLabel: string) => {
  const container = document.createElement('aside');
  container.className = CONTAINER_CLASS;
  container.setAttribute('aria-label', ariaLabel);

  const shadowRoot = container.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = inlineCSS();

  shadowRoot.appendChild(style);

  return { container, shadowRoot };
};

const getContainer = () => {
  return document.querySelector<HTMLElement>(`.${CONTAINER_CLASS}`);
};

const getHiddenContainerBottom = (container: HTMLElement) => {
  const containerHeight = getFloat(container, 'height');

  return `-${containerHeight}px`;
};

const toggleContainer = (isVisible: boolean, bottom?: string) => {
  let container = getContainer();

  if (!container) container = init();

  container.setAttribute('aria-hidden', String(!isVisible));
  container.style.bottom = bottom || getHiddenContainerBottom(container);

  if (!isVisible) {
    setTimeout(
      () => (container!.style.bottom = getHiddenContainerBottom(container!)),
      // Wait for the close transition and only then reset the bottom
      getTransitionTime(container) + 1,
    );
  }
};

export { createNewContainer, getContainer, getHiddenContainerBottom, toggleContainer };
