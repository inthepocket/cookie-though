# Styling

You can easily define your own CSS on top of the CSS that is already included by default:

```css
.cookie-though {
  /* The colors used to style the modal */
  --ct-primary-400: #000099;
  --ct-primary-300: #7676ec;
  --ct-primary-200: #e0e0ff;
  --ct-primary-100: #f0f0ff;

  /* The colors used to style the text and the disabled pill button colors */
  --ct-gray-400: #78787a;
  --ct-gray-300: #d4d4d4;

  /* The colors used to style the pill buttons when they are enabled */
  --ct-slider-400: #4c4cff;
  --ct-slider-300: #b3b3ff;

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
  --ct-heading-font-size: 20px;

  /* The font size of the header sub title */
  --ct-sub-heading-font-size: 14px;

  /* The font size of text */
  --ct-text-font-size: 12px;

  /* The font used in the app */
  --ct-primary-font: 'Arial';

  /* The font used for header description and policy description */
  --ct-secondary-font: 'Times';

  /* The z-index you want the root container to have */
  --ct-z-index: 9999;
}
```

> No SCSS variables can be used because these are plain CSS variables.
