# Config Proposal

Configuration will not support multiple languages if you want to switch the language at runtime, you will need to call configure with adjusted labels.

More information about the model:

## Model

The root config object consists of:

* header: Header (see Header)
* cookiePolicy: CookiePolicy (see CookiePolicy)
* accept: string | text for the accept button
* decline: string | text for the decline button
* policies: Policy[] (see Policy)

### CookiePolicy

* url: URL | link to a pdf or website explaining the complete cookie policy
* label: string | text that is used for the link

### Header

* title: string
* subtitle: string
* description: string

### Policy

We need to support **policies**

A policy consists of:

* id: string | needs to be unique within the policies array
* label: string | text to thow in the UI for this policy
* description: string | describes what the policy does when accepted.
* category: essential, social, statistics, functional, personalisation, advertisement

Remark: policies of type essential can not be disabled.

### Example

```json
{
  "policies": [
    {
      "id": "essential",
      "label": "Essential Cookies",
      "description": "We need to save some technical cookies, for the website to function properly.",
      "category": "essential",
      "isRequired": true,
    },
    {
      "id": "functional",
      "label": "Functional Cookies",
      "category": "functional",
      "description": "We need to save some basic preferences eg. language.",
      "isRequired": false,
    },
    {
      "id": "statistics",
      "label": "Statistics",
      "category": "statistics",
      "description": "We need to save some technical cookies, for the website to function properly.",
      "isRequired": true,
    },
    {
      "id": "social",
      "label": "Social Media Cookies",
      "category": "social",
      "description": "We need to save some technical cookies, for the website to function properly.",
      "isRequired": true,
    },
  ],
  "header": {
      "title": "cookie though?",
      "subTitle": "You're probably fed up with these banners...",
      "description": "Everybody wants to show his best side - and so do we. That’s why we use cookies to guarantee you a better experience."
  },
  "cookiePolicy": {
    "url":"https://inthepocket.com/cookie-policy",
    "label":"Read the full cookie declaration",
  },
  "accept":"Approve",
  "decline": "Deny"
};
```
