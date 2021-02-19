---
layout: docs
title: styling
---
# Styling

You can easily define your own CSS on top of the CSS that is already included by default:

```css
.cookie-though {
  /* The colors used to style the modal */
  --ct-primary-400: #000099;
  --ct-primary-300: #6161e8;
  --ct-primary-200: #e0e0ff;
  --ct-primary-100: #f0f0ff;

  /* The colors used to style: customizationButton, headerDescription and cookiePolicy */
  --ct-text: #6b7280;

  /* The colors used to style the title elements */
  --ct-subtitle: var(--ct-primary-300);
  --ct-title: var(--ct-primary-400);

  /* The color used to style the cookie svg */
  --ct-cookie: var(--ct-primary-400);

  /* The colors used to style a policy */
  --ct-policy: var(--ct-white);
  --ct-policy-enabled: var(--ct-primary-400);
  --ct-policy-text: var(--ct-primary-400);
  --ct-policy-text-enabled: var(--ct-white);
  --ct-policy-essential: var(--ct-primary-100);

  /* The colors used to style the sliders */
  --ct-slider-primary: var(--gray-400);
  --ct-slider-secondary: var(--gray-300);
  --ct-slider-enabled-primary: #4c4cff;
  --ct-slider-enabled-secondary: #b3b3ff;

  /* The font color of the text inside a policy when it's enabled  */
  --ct-enabled-option-color: var(--ct-white);

  /* The white color */
  --ct-white: #ffffff;

  /* The margin underneath text elements */
  --ct-text-margin: 0.25rem;

  /* The padding of the modal and margin of the banner, toggleButton and customization */
  --ct-default-padding: 1rem;

  /* The padding/margin used to seperate the options and the permission buttons */
  --ct-seperator-padding: 0.5rem;

  /* The font size of the header title */
  --ct-heading-font-size: 1.25rem;

  /* The font size of the header sub title */
  --ct-sub-heading-font-size: 0.875rem;;

  /* The font size of text */
  --ct-text-font-size: 0.75rem;

  /* The font size of the customize button and permission button labels */
  --ct-button-font-size: 0.8125rem;

  /* The font used in the app */
  --ct-primary-font: 'Arial';

  /* The font used for header description and policy description */
  --ct-secondary-font: 'Times';

  /* The z-index you want the root container to have */
  --ct-z-index: 9999;
}
```

> No SCSS variables can be used because these are plain CSS variables.
