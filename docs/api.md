# API

## init

This method is required to be called. If you don't pass a config object as first argument, it will use a default config.

```js
import { init } from 'cookie-though';

// This will show the Cookie though widget
// in case no preferences have been stored
init(config);
```

## configure

This method allows you to reconfigure the Cookie Though  widget after initial load.

```js
import { configure } from 'cookie-though';

// This will show the Cookie though widget
// in case no preferences have been stored
configure(config);
```

## show

Allows you to show the Cookie Though dialog. Can be useful to bound to your own logic.

```js
import { show } from 'cookie-though';

show();
```

## hide

Allows you to hide the Cookie Though dialog. Can be  useful to bound to your own logic.

```js
import { hide } from 'cookie-though';

hide();
```

## useCookieThough

This hook allows you to easily track the enabled state of a certain policy or option.

```js
import { useCookieThough } from 'cookie-though';

function App() {
    const enabled = useCookieThough('analytics');
    if (!enabled) {
        return <p>Consent has not been given</p>
    }
    return <p>Consent has been given</p>
}
```

## get

This method allows you to retrieve the state of all the user preferences.

```js
import { get } from 'cookie-though';

console.log('preferences', get());
```

## listen

This method allows you to listen for changes of user preferneces.

```js
import { listen } from 'cookie-though';

listen((preferences)=> {
    console.log('preferences', preferences);
})
```
