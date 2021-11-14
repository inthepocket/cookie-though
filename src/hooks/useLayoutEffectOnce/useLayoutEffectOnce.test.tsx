import { renderHook } from '@testing-library/preact-hooks';

import useLayoutEffectOnce from '.';

describe('useLayoutEffectOnce', () => {
  it('will only run the layout effect once', () => {
    const layoutEffect = jest.fn();

    renderHook(() => useLayoutEffectOnce(layoutEffect));

    expect(layoutEffect).toBeCalledTimes(1);
  });
});
