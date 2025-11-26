---
layout: ../layouts/DocsLayout.astro
title: development
---

# Development

## Getting started

### Prerequisites

## NodeJS

Best to install NodeJS via asdf (not supported for Windows). This allows you to easily switch to a new Node version, if it is released.

```sh
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.0
# Add the following line to ~/.bash_profile
. $HOME/.asdf/asdf.sh
```

Add nodejs plugin

```sh
# Dependencies on gpg and GNU core utils
brew install coreutils gpg
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.
bash -c '${ASDF_DATA_DIR:=$HOME/.asdf}/plugins/nodejs/bin/import-release-team-keyring'
```

Once asdf & nodejs plugin are installed, you can just run:

```sh
asdf install
npm install
```

## Testing

Test are run with jest. Plugin can be installed for vscode [vscode-jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest). This allows you to easily run/debug tests from within vscode. Tests can also be executed via npm:

```sh
npm run test
```

## Building

Parcel is used to build the project. You can build the project via npm:

```sh
npm run build
```

## Documentation

In order to run the documentation you need to install Astro, you can do this by running:

```sh
npm install
```

After having installed dependencies you can get the marketing site/documentation up and running via npm:

```sh
npm run dev:site
```

## Deployment

Deploy is done via Gitlab on Firebase Hosting. An example integration can be found on the [homepage](https://cookiethough.dev/)

## Overview CLI Commands

* `npm install`: Installs dependencies

* `npm run dev`: Run a development server

* `npm run dev:site`: Run a development server for the marketing site and docs

* `npm run build`: Production-ready build

* `npm run lint`: Pass TypeScript files using TSLint

* `npm run test`: Run Jest and Enzyme with
    [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for
    your tests
