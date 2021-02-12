# Contributing

Thanks for your interest in contributing to Cookie Though! Please take a moment to review this document **before submitting a pull request**.

## Pull requests

**Please ask first before starting work on any significant new features.**

It's never a fun experience to have your pull request declined after investing a lot of time and effort into a new feature. To avoid this from happening, we request that contributors create [an issue](https://github.com/inthepocket/cookie-though/issues) to first discuss any significant new features. This includes things like adding new utilities, creating new style rules, etc.

## Coding standards

Our code formatting rules are defined in [.eslintrc.js](https://github.com/inthepocket/cookie-though/blob/master/.eslintrc.js). You can check your code against these standards by running:

```sh
npm run lint
```

To automatically fix any style violations in your code, you can run:

```sh
npm run lint -- --fix
```

## Running tests

You can run the test suite using the following commands:

```sh
npm run test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features to Cookie Though, please include tests. We strive to have a coverage of at least 90% on this project.

## Building the app and trying your changes locally

In addition to the automated tests, if you'd like to test the app locally with your own app, you run the application by running:

```sh
npm run dev
```

This will create a running site in the `/dist` folder which you can view in your browser at [localhost:1234](localhost:1234).
