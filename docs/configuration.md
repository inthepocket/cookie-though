# Configuration of the app

The plugin will not support multiple languages. In order to switch languages at runtime, you will have to call the configure function with a new config.

The plugin also comes with a default english config, which implements a policy from each of the categories listed further below.

More information about the configuration options:

## Config

The config object consists of (? means it's optional):

* policies: [policy](###policy)[]
* [permissionLabels](###permissionLabels)
* [cookiePreferenceKey?](###cookiePreferenceKey): string
* [header?](###header)
* [cookiePolicy](###cookiePolicy)?

### policy

We need to support **policies**

A policy consists of:

* id: string | a unique string, this is the key stored in the cookie preferences array
* label: string | the title to thow in the UI for this policy
* description: string | the describtion in the UI that describes what the policy does
* category: string | essential, social, statistics, functional, personalisation, marketing

Remark: policies of type essential can not be disabled.

### permissionLabels

These are the labels that are displayed on the buttons to accept or deny the preferences.

The labels consist of:

* accept: string | the value of the accept button when a user has customised some of the policies
* acceptAll: string | the value of the accept button when a user accepts all policies
* decline: string | the value of the decline button

### cookiePreferenceKey

This is an an optional string that allows the developer to specify the name of the cookie that stores the user preferences.

### header

An optional object that contains the values that are show in the banner of the cookie though modal

* title: string
* subtitle: string
* description: string

### cookiePolicy

An optional object that contains the values used to link a user to the cookie policy

* url: URL | link to a pdf or website explaining the complete cookie policy
* label: string | text that is used for the link

### Example

```json
{
  "policies": [
    {
      "id": "essential",
      "label": "Essential Cookies",
      "description": "We need to save some technical cookies, for the website to function properly.",
      "category": "essential",
    },
    {
      "id": "functional",
      "label": "Functional Cookies",
      "category": "functional",
      "description": "We need to save some basic preferences eg. language.",
    },
    {
      "id": "statistics",
      "label": "Statistics",
      "category": "statistics",
      "description": "We need to save some technical cookies, for the website to function properly.",
    },
    {
      "id": "social",
      "label": "Social Media Cookies",
      "category": "social",
      "description": "We need to save some social cookies, for the website to function properly.",
    },
  ],
  "permissionLabels": {
    "accept": "Accept",
    "acceptAll": "Accept all",
    "decline": "Decline"
  },
  "cookiePreferenceKey": "cookie-preferences",
  "header": {
      "title": "cookie though?",
      "subTitle": "You're probably fed up with these banners...",
      "description": "Everybody wants to show his best side - and so do we. That’s why we use cookies to guarantee you a better experience."
  },
  "cookiePolicy": {
    "url":"https://inthepocket.com/cookie-policy",
    "label":"Read the full cookie declaration",
  },
};
```
