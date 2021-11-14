import { renderHook } from '@testing-library/preact-hooks';
import { FunctionComponent } from 'preact';

import { ContainerProvider, useContainer } from '.';

describe('Container', () => {
  describe('A ContainerProvider is used', () => {
    it('useContainer will return the container', () => {
      const container = document.createElement('aside');
      const wrapper: FunctionComponent = ({ children }) => (
        <ContainerProvider container={container} children={children} />
      );

      const { result } = renderHook(useContainer, { wrapper });

      expect(result.current).toBe(container);
    });
  });

  describe('A ContainerProvider is not used', () => {
    it('useContainer will throw an error', () => {
      const { result } = renderHook(useContainer);

      expect(result.error.message).toBe('useContainer must be used within a ContainerProvider');
    });
  });
});
