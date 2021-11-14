import app from 'bundle-text:../components/app.css';
import button from 'bundle-text:../components/button/button.css';
import consent from 'bundle-text:../components/consent/consent.css';
import option from 'bundle-text:../components/consent/option/option.css';
import header from 'bundle-text:../components/header/header.css';
import reset from 'bundle-text:../components/reset.css';

const inlineCSS = () => {
  return reset + app + header + consent + option + button;
};

export default inlineCSS;
