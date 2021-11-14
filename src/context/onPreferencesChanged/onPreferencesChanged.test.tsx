import { renderHook } from '@testing-library/preact-hooks';
import { FunctionComponent } from 'preact';

import { OnPreferencesChangedProvider, useOnPreferencesChanged } from '.';

describe('OnPreferencesChanged', () => {
  describe('An OnPreferencesChangedProvider is used', () => {
    it('useOnPreferencesChanged will return the onPreferencesChanged callback', () => {
      const onPreferencesChanged = jest.fn();
      const wrapper: FunctionComponent = ({ children }) => (
        <OnPreferencesChangedProvider
          onPreferencesChanged={onPreferencesChanged}
          children={children}
        />
      );

      const { result } = renderHook(useOnPreferencesChanged, { wrapper });

      expect(result.current).toBe(onPreferencesChanged);
    });
  });
});
