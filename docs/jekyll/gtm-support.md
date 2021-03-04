---
layout: docs
title: google tag manager
---
# GTM Support

## 1. Ensure Cookie Though is&nbsp;[installed](/docs/installation)

## 2. Enable GTM in your app

### A) Create a project on&nbsp;[Tag Manager](https://tagmanager.google.com)

Create the project on GTM and add the [GTM scripts](https://developers.google.com/tag-manager/quickstart) to your web page.

### B) Create the Cookie Though variable

After creating on project, create a variable with a direct cookie type and link it to [cookiePreferenceKey](/docs/configuration###cookiePreferenceKey) (cookie-preferences by default).

### C) Create the triggers for adding tags

Create two triggers for each policy:

* One trigger will add tags when the user changes his preferences;
* The other will add tags when the DOM is ready (in case the user already has his/her preferences stored)

In order for the triggers to work with a policy, you'll have to link it to the Cookie Though variable and make sure to add the policy. An example of the two triggers with analytics:

![analytics-allow](/images/analytics-allow.png)
![analytics-init](/images/analytics-init.png)

In the custom event you can see it's also linked to an event name. This is the event the app needs to push to the dataLayer when the preferences change. This can be done easily by adding the following code to the [onPreferencesChanged](/api##onPreferencesChanged) function:

```js
// With cdn
CookieThough.onPreferencesChanged(() => dataLayer.push({'event': 'preferences_changed'}));

// With npm package
onPreferencesChanged(() => dataLayer.push({'event': 'preferences_changed'}));
```

### D) Create the tags and link them to the triggers

### E) Publish the container
