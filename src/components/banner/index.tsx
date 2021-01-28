import { FunctionalComponent, h } from 'preact';
import { Config } from '../../types';
import './style.css';

interface Props {
  header?: Config['header'];
}

const Banner: FunctionalComponent<Props> = ({ header }) => {
  const keyExists = (key: keyof NonNullable<Config['header']>) => {
    if (!header || !Object.keys(header).length) {
      return false;
    }

    return key in header;
  };
  const getValue = (key: keyof NonNullable<Config['header']>) => header![key];

  return (
    <div className="ct-banner">
      <div className="ct-banner-intro">
        <div className="ct-banner-header">
          {keyExists('subTitle') && <p>{getValue('subTitle')}</p>}
          {keyExists('title') && <h1>{getValue('title')}</h1>}
        </div>
        <div className="ct-banner-logo">
          <svg width="33" height="33" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16.0931C0 7.31017 7.08034 0.170226 15.8796 0C16.355 1.60409 17.6674 2.84849 19.3107 3.22734C18.8815 4.16354 18.6423 5.2049 18.6423 6.30214C18.6423 10.3822 21.9498 13.6897 26.0299 13.6897C27.3458 13.6897 28.5814 13.3456 29.6515 12.7425C30.0445 14.14 31.0702 15.2725 32.3999 15.8113C32.4016 15.905 32.4024 15.999 32.4024 16.0931C32.4024 24.9828 25.1489 32.1893 16.2012 32.1893C7.25352 32.1893 0 24.9828 0 16.0931ZM19.0989 18.8305V16.1355H21.5059V18.8305C21.5059 21.875 19.6636 23.9169 16.2012 23.9169C12.7388 23.9169 10.8965 21.875 10.8965 18.8305V10.3777H15.7106V12.7691H13.3035V18.8305C13.3035 20.6977 14.2015 21.5255 16.2012 21.5255C18.2009 21.5255 19.0989 20.6977 19.0989 18.8305Z" />
          </svg>
        </div>
      </div>
      {keyExists('description') && (
        <div className="ct-banner-explanation">{getValue('description')}</div>
      )}
    </div>
  );
};

export default Banner;
