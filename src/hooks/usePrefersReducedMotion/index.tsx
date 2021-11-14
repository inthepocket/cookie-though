import { useEffect, useState } from 'preact/hooks';

export const PREFERS_REDUCED_MOTION_NO_PREFERENCE = '(prefers-reduced-motion: no-preference)';
const getInitialState = () => !window.matchMedia(PREFERS_REDUCED_MOTION_NO_PREFERENCE).matches;

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(PREFERS_REDUCED_MOTION_NO_PREFERENCE);

    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(!event.matches);

    mediaQueryList.addEventListener('change', listener);

    return () => mediaQueryList.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
