import { FunctionalComponent, h } from 'preact';
import ToggleButton from './toggleButton';
import styles from './css/customization.css';
import { useEffect, useState } from 'preact/hooks';
import Options from './options';
import { Collapse } from 'react-collapse';
import Button from '../button';
import buttonStyles from '../button/style.css';
import { CookieOption } from './option';
import { hideCookieThough } from '../app';

interface Props {
  cookieOptions: CookieOption[];
}

const Customization: FunctionalComponent<Props> = ({ cookieOptions }) => {
  const [options, setOptions] = useState(() => cookieOptions);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      'cookie-preferences',
      JSON.stringify({
        isCustomised: true,
        cookieOptions: options,
      }),
    );
  }, [options]);

  const toggleOption = (key: number) => {
    options[key] = { ...options[key], isEnabled: !options[key].isEnabled };
    setOptions([...options]);
  };

  const declineAllOptions = () => {
    const declinedOptions = options.map(option => ({ ...option, isEnabled: false }));
    setOptions(declinedOptions);
    setIsActive(false);
    hideCookieThough();
  };

  const acceptOptions = () => {
    if (!isActive) {
      setOptions(options.map(option => ({ ...option, isEnabled: true })));
    }

    setIsActive(false);
    hideCookieThough();
  };

  return (
    <div>
      <ToggleButton
        isActive={isActive}
        toggleCustomization={() => setIsActive(prevState => !prevState)}
      />
      <Collapse isOpened={isActive}>
        <Options options={options} onToggle={toggleOption} />
      </Collapse>
      <div className={styles.acceptance}>
        <Button label="Decline" className={buttonStyles.secondary} onClick={declineAllOptions} />
        <Button label={isActive ? 'Accept' : 'Accept all'} onClick={acceptOptions} />
      </div>
    </div>
  );
};

export default Customization;
