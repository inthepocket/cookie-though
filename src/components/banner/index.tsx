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
          <svg
            width="33"
            height="33"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5 14C21.4008 14 22.251 13.7834 23.0014 13.3996C23.0005 13.4329 23 13.4664 23 13.5C23 15.0583 24.0184 16.3788 25.426 16.8321C23.7905 22.1414 18.8459 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.954 0 14.884 0.102758 15.7795 0.29781C15.292 0.899245 15 1.66552 15 2.5C15 3.53742 15.4514 4.46941 16.1684 5.11034C15.4364 6.04443 15 7.22125 15 8.5C15 11.5376 17.4624 14 20.5 14ZM11 7C11 7.55228 10.5523 8 10 8C9.44772 8 9 7.55228 9 7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7ZM12 13C12 14.1046 11.1046 15 10 15C8.89543 15 8 14.1046 8 13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13ZM17 20C17.5523 20 18 19.5523 18 19C18 18.4477 17.5523 18 17 18C16.4477 18 16 18.4477 16 19C16 19.5523 16.4477 20 17 20ZM10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5Z"
              fill="#000099"
            />
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
