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

## getPreferences

This method allows you to retrieve the state of all the user preferences.

```js
import { getPreferences } from 'cookie-though';

console.log('preferences', getPreferences());
```

## onPreferencesChanged

This method allows you to listen for changes of user preferneces.

```js
import { onPreferencesChanged } from 'cookie-though';

onPreferencesChanged((preferences)=> {
    console.log('preferences', preferences);
})
```
