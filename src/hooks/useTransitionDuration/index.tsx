import { useContainer } from '../../context/container';

const withoutSuffix = (cssTransitionDuration: string) => {
  return parseFloat(cssTransitionDuration.replace(/[^0-9.,]+/, ''));
};

export const getTransitionTime = (container: HTMLElement) => {
  const cssProperty = getComputedStyle(container).getPropertyValue('--ct-transition-duration');

  if (cssProperty.includes('ms')) {
    return withoutSuffix(cssProperty);
  }

  return withoutSuffix(cssProperty) * 1000;
};

const useTransitionDuration = () => {
  const container = useContainer();

  return getTransitionTime(container);
};

export default useTransitionDuration;
