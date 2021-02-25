import { useLayoutEffect } from 'preact/hooks';
import throttle from 'lodash.throttle';

const useWindowResize = (callback: () => void) => {
  useLayoutEffect(() => {
    const throttledCallback = throttle(callback, 100);
    window.addEventListener('resize', throttledCallback);

    return () => window.removeEventListener('resize', throttledCallback);
  }, [callback]);
};

export default useWindowResize;
