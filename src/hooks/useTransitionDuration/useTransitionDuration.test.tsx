import { renderHook } from '@testing-library/preact-hooks';
import { FunctionComponent } from 'preact';

import { ContainerProvider } from '../../context/container';
import useTransitionDuration from '.';

describe('useTransitionDuration', () => {
  it('will return the transition duration', () => {
    const container = document.createElement('aside');
    container.style.setProperty('--ct-transition-duration', '300ms');
    const wrapper: FunctionComponent = ({ children }) => (
      <ContainerProvider container={container} children={children} />
    );

    const { result } = renderHook(useTransitionDuration, { wrapper });

    expect(result.current).toBe(300);
  });
});
