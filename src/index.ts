// Must be the first import
if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

import { h, render } from 'preact';
import './style/index.css';
import App from './components/app';

interface Config {
  [key: string]: string | number | boolean;
}

export const init = (config: Config): void => {
  const container = document.createElement('div');
  document.body.append(container);

  render(h(App, config), container);
};
