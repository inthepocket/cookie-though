import { queryByRole, render } from '@testing-library/preact';
import MatchMedia from 'jest-matchmedia-mock';

import defaultConfig from '../config';
import { createNewContainer } from '../utils/container';
import { mapToConsent, mapToPreferences } from '../utils/mappers';
import { setPreferences } from '../utils/preferences';
import App from './app';

new MatchMedia();
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('App', () => {
  afterEach(() => jest.clearAllMocks());

  it('can render the app without a cookie preference key', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cookiePreferencesKey, ...config } = defaultConfig;
    const { container } = createNewContainer(config.ariaLabel);

    render(<App config={config} container={container} />, {
      container: document.body.appendChild(container),
    });

    jest.runAllTimers();

    expect(queryByRole(document.body, 'complementary')).toBeInTheDocument();
  });

  describe('The user has not customised his/her preferences', () => {
    afterAll(() => jest.clearAllMocks());

    it('will show the container', () => {
      const { container } = createNewContainer(defaultConfig.ariaLabel);
      render(<App config={defaultConfig} container={container} />, {
        container: document.body.appendChild(container),
      });

      expect(queryByRole(document.body, 'complementary')).not.toBeInTheDocument();
      expect(setTimeout).toHaveBeenCalledTimes(1);

      jest.runAllTimers();

      expect(queryByRole(document.body, 'complementary')).toBeInTheDocument();
    });
  });

  describe('The user has customised his/her preferences', () => {
    beforeAll(() => {
      const { cookiePreferencesKey, policies } = defaultConfig;
      const preferences = mapToPreferences(policies);
      const { options } = mapToConsent({ policies, preferences, isCustomised: true });
      setPreferences({ cookiePreferencesKey, options });
    });

    afterAll(() => jest.clearAllMocks());

    it('will hide the container', () => {
      const { container } = createNewContainer(defaultConfig.ariaLabel);
      render(<App config={defaultConfig} container={container} />, {
        container: document.body.appendChild(container),
      });

      expect(queryByRole(document.body, 'complementary')).not.toBeInTheDocument();
      expect(setTimeout).not.toHaveBeenCalled();
    });
  });
});
