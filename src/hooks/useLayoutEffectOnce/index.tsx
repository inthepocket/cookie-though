import { EffectCallback, useLayoutEffect } from 'preact/hooks';

const useLayoutEffectOnce = (effect: EffectCallback) => {
  // Since we're only running the effect once, there are no dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(effect, []);
};

export default useLayoutEffectOnce;
