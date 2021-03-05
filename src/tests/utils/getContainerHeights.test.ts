import getContainerHeights from '../../utils/getContainerHeights';

describe('getContainerHeights', () => {
  it('can get the containerHeights', () => {
    const container = document.createElement('div');
    container.className = 'cookie-though';
    container.attachShadow({ mode: 'open' });

    const banner = document.createElement('div');
    banner.className = 'ct-banner';
    container.shadowRoot!.appendChild(banner);

    const customizationButton = document.createElement('div');
    customizationButton.className = 'ct-customization-button';
    container.shadowRoot!.appendChild(customizationButton);

    const acceptance = document.createElement('div');
    acceptance.className = 'ct-acceptance';
    container.shadowRoot!.appendChild(acceptance);

    document.body.appendChild(container);

    expect(getContainerHeights()).toEqual({ collapsedHeight: 0, containerOffset: 0 });
  });
});
