# Installation of the app

There's 2 ways of installing the app within your site/platform:

* By installing the package through the [cdn](##cdn)
* By installing the package through [npm/yarn](##npm/yarn)

If you want to change the style of the modal, you can do so by overriding the css variables attached to the `.cookie-though` class. For more information about styling, [check the styling page](/docs/styling)

After peforming the initialisation of the app, it should show the cookie though modal on your site/platform and store the preferences in a cookie. Don't forget the app **only saves the preferences. It doesn't implement the cookies**, so implementing the cookies is up to you!

## CDN

Add the following script tags in your html:

```html
<head>
  <script src="https://unpkg.com/cookie-though@<version>"></script>
</head>
<html>
  <body>
    <script>CookieThough.init(config)</script>
  </body>
</html>
```

## npm/yarn

Install the package with:

```bash
npm install --save cookie-though
yarn add cookie-though
```

Import the functions you need in your app

```js
import { init } from 'cookie-though';

init(config)
```
