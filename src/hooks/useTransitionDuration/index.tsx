import { useContainer } from '../../context/container';

export const getTransitionTime = (container: HTMLElement) => {
  return parseInt(getComputedStyle(container).getPropertyValue('--ct-transition-duration'), 10);
};

const useTransitionDuration = () => {
  const container = useContainer();

  return getTransitionTime(container);
};

export default useTransitionDuration;
