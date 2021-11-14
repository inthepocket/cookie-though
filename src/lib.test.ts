import MatchMedia from 'jest-matchmedia-mock';

import { configure, getCookiePreferences, hide, show } from './lib';
import { getContainer } from './utils/container';

new MatchMedia();

describe('configure', () => {
  it('can render the app with a custom configuration', () => {
    configure({
      ariaLabel: 'Cookie Banner',
      optionsAriaLabel: 'Cookie options',
      policies: [
        {
          id: 'essential',
          label: 'Strictly necessary cookies',
          description: 'These cookies are required to run the site.',
          category: 'essential',
        },
      ],
      permissionLabels: {
        accept: 'Accept',
        acceptAll: 'Accept All',
        decline: 'Decline',
      },
      header: {
        description: 'Cookies are good for you!',
      },
      customizeLabel: 'Customize',
    });

    const container = document.querySelector('.cookie-though');
    expect(container).toHaveAttribute('aria-hidden', 'true');
  });

  describe('a previous instance already exists', () => {
    describe('the previous instance contains a shadow root', () => {
      it('will render the app inside the existing shadow root', () => {
        configure();
        configure();

        expect(document.querySelectorAll('.cookie-though')).toHaveLength(1);
        expect(getContainer()).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('the previous instance does not contain a shadow root', () => {
      it('will create a new container with a shadow root and render the app', () => {
        const containerWithoutShadowRoot = document.createElement('aside');
        containerWithoutShadowRoot.className = 'cookie-though';
        document.body.prepend(containerWithoutShadowRoot);

        configure();

        expect(getContainer()).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('a previous instance does not exist', () => {
    it('will create a new container with a shadow root and render the app', () => {
      configure();

      expect(getContainer()).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

describe('show', () => {
  it('can show the container', () => {
    show();

    expect(getContainer()).toHaveAttribute('aria-hidden', 'false');
  });
});

describe('hide', () => {
  it('can hide the container', () => {
    hide();

    expect(getContainer()).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('getCookiePreferences', () => {
  it('can retrieve the cookie preferences', () => {
    expect(getCookiePreferences()).toStrictEqual({ isCustomised: false, preferences: undefined });
  });
});
