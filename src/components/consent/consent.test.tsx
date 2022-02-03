import { fireEvent, render } from '@testing-library/preact';
import MatchMedia from 'jest-matchmedia-mock';

import defaultConfig, { Config } from '../../config';
import { ContainerProvider } from '../../context/container';
import { createNewContainer } from '../../utils/container';
import { Consent as ConsentType, mapToConsent, mapToPreferences } from '../../utils/mappers';
import Consent from '.';

const {
  ariaLabel,
  customizeLabel,
  optionsAriaLabel,
  essentialLabel,
  cookiePreferencesKey,
  policies,
} = defaultConfig;
const cookiePolicy: Config['cookiePolicy'] = {
  url: '',
  label: 'View the full cookie policy here',
};
const preferences = mapToPreferences(policies);
const DEFAULT_CONSENT: ConsentType = mapToConsent({ policies, preferences, isCustomised: false });
const ACCEPTED_PREFERENCES =
  'cookie-preferences=essential:1|functional:1|statistics:1|marketing:1|social:1|personalisation:1';
const DECLINED_PREFERENCES =
  'cookie-preferences=essential:1|functional:0|statistics:0|marketing:0|social:0|personalisation:0';
const CUSTOMIZED_PREFERENCES =
  'cookie-preferences=essential:1|functional:1|statistics:0|marketing:0|social:0|personalisation:0';

new MatchMedia();
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const scrollIntoViewSpy = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewSpy;

describe('Consent', () => {
  afterEach(() => jest.clearAllMocks());

  const renderConsent = (permissionLabels?: Config['permissionLabels']) => {
    const { container } = createNewContainer(ariaLabel);

    const { getAllByRole, getByText, getByRole } = render(
      <ContainerProvider container={container}>
        <Consent
          customizeLabel={customizeLabel}
          optionsAriaLabel={optionsAriaLabel}
          consent={DEFAULT_CONSENT}
          essentialLabel={essentialLabel}
          permissionLabels={permissionLabels}
          cookiePreferencesKey={cookiePreferencesKey}
          cookiePolicy={cookiePolicy}
        />
      </ContainerProvider>,
    );

    const [details] = getAllByRole('group') as HTMLDetailsElement[];

    return { details, getAllByRole, getByText, getByRole };
  };

  it('can accept all options', () => {
    const { details, getAllByRole } = renderConsent(defaultConfig.permissionLabels);
    const [, acceptButton] = getAllByRole('button');
    fireEvent.click(acceptButton);

    expect(document.cookie).toBe(ACCEPTED_PREFERENCES);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();

    expect(details.open).toBeFalsy();
  });

  it('can decline all options', () => {
    const { details, getAllByRole } = renderConsent(defaultConfig.permissionLabels);
    const [declineButton] = getAllByRole('button');
    fireEvent.click(declineButton);

    expect(document.cookie).toBe(DECLINED_PREFERENCES);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();

    expect(details.open).toBeFalsy();
  });

  it('can toggle an option', () => {
    const { details, getAllByRole } = renderConsent(defaultConfig.permissionLabels);
    const [, functionalOption] = getAllByRole('checkbox');
    const [, acceptButton] = getAllByRole('button');

    // We focus the option first for coverage purposes, for more info:
    // https://testing-library.com/docs/guide-events/
    fireEvent.focus(functionalOption);
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(functionalOption);
    expect(functionalOption).toBeChecked();

    fireEvent.click(acceptButton);
    expect(document.cookie).toBe(CUSTOMIZED_PREFERENCES);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();
    expect(details.open).toBeFalsy();
  });

  describe('permission labels were not provided in the custom configuration', () => {
    it('will render the consent component with default permission labels', () => {
      const { getAllByRole } = renderConsent(undefined);

      expect(getAllByRole('button')).toHaveLength(2);
    });
  });

  describe('An accept label was not provided in the custom configuration', () => {
    it('will render the consent component with default accept label', () => {
      const { getByRole } = renderConsent({ acceptAll: 'Accept all', decline: 'Decline' });

      const functionalOption = getByRole('checkbox', { name: DEFAULT_CONSENT.options[1].label });
      fireEvent.click(functionalOption);

      expect(
        getByRole('button', { name: defaultConfig.permissionLabels.accept }),
      ).toBeInTheDocument();
    });
  });

  describe('An accept all label was not provided in the custom configuration', () => {
    it('will render the consent component with default accept all label', () => {
      const { getByRole } = renderConsent({ accept: 'Accept', decline: 'Decline' });

      expect(
        getByRole('button', { name: defaultConfig.permissionLabels.acceptAll }),
      ).toBeInTheDocument();
    });

    it('can accept all options', () => {
      const { getByRole } = renderConsent({ accept: 'Accept', decline: 'Decline' });

      const acceptAllButton = getByRole('button', {
        name: defaultConfig.permissionLabels.acceptAll,
      });
      fireEvent.click(acceptAllButton);

      expect(document.cookie).toBe(ACCEPTED_PREFERENCES);
    });
  });

  describe('A decline label was not provided in the custom configuration', () => {
    it('will render the consent component with default decline label', () => {
      const { getByRole } = renderConsent({ accept: 'Accept', acceptAll: 'Accept all' });

      expect(
        getByRole('button', { name: defaultConfig.permissionLabels.decline }),
      ).toBeInTheDocument();
    });
  });
});
