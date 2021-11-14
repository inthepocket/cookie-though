import { renderHook } from '@testing-library/preact-hooks';
import MatchMediaMock from 'jest-matchmedia-mock';
import { act } from 'preact/test-utils';

import usePrefersReducedMotion, { PREFERS_REDUCED_MOTION_NO_PREFERENCE } from '.';

const matchMedia = new MatchMediaMock();

const PREFERS_REDUCED_MOTION_REDUCE = '(prefers-reduced-motion: reduce)';

describe('usePrefersReducedMotion', () => {
  describe('The user has no-preference', () => {
    beforeAll(() => matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_NO_PREFERENCE));

    afterAll(() => matchMedia.clear());

    it('will return false', () => {
      const { result } = renderHook(usePrefersReducedMotion);

      expect(result.current).toBeFalsy();
    });
  });

  describe('The user has reduce', () => {
    beforeAll(() => matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_REDUCE));

    afterAll(() => matchMedia.clear());

    it('will return false', () => {
      const { result } = renderHook(usePrefersReducedMotion);

      expect(result.current).toBeTruthy();
    });
  });

  describe('The user switches between values', () => {
    beforeAll(() => matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_REDUCE));

    afterAll(() => matchMedia.clear());

    it('will update the value', async () => {
      const { result } = renderHook(usePrefersReducedMotion);

      expect(result.current).toBeTruthy();

      await act(() => matchMedia.useMediaQuery(PREFERS_REDUCED_MOTION_NO_PREFERENCE));

      expect(result.current).toBeFalsy();
    });
  });
});
