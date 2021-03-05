const getContainerHeights = () => {
  const shadowRoot = document.querySelector('.cookie-though')!.shadowRoot!;
  const banner = shadowRoot.querySelector('.ct-banner')!;
  const customizationButton = shadowRoot.querySelector('.ct-customization-button')!;
  const acceptance = shadowRoot.querySelector('.ct-acceptance')!;
  const heights = [];

  const bannerStyles = window.getComputedStyle(banner);
  heights.push(bannerStyles.height, bannerStyles.paddingTop, bannerStyles.paddingTop);

  const customizationButtonStyles = window.getComputedStyle(customizationButton);
  heights.push(customizationButtonStyles.height);

  const acceptanceStyles = window.getComputedStyle(acceptance);
  heights.push(acceptanceStyles.height, acceptanceStyles.paddingTop, acceptanceStyles.paddingTop);

  // CustomizationButton gets default padding as margin bottom when expanded
  heights.push(bannerStyles.paddingTop);

  const collapsedHeight = heights.reduce((totalHeight, currentHeight) => {
    return totalHeight + Number(currentHeight.slice(0, -2));
  }, 0);

  return { collapsedHeight, containerOffset: +bannerStyles.paddingBottom.slice(0, -2) * 2 };
};

export default getContainerHeights;
