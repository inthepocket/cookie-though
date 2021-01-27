import { FunctionalComponent, h } from 'preact';
import ToggleButton from './toggleButton';
import styles from './css/customization.css';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Options from './options';
import Collapse from './collapse';
import Button from '../button';
import buttonStyles from '../button/style.css';
import { Config, CookieOption } from '../../types';
import useCookie from '../../hooks/useCookie';

interface Props {
  cookieOptions: CookieOption[];
  permissionLabels: Config['permissionLabels'];
  cookiePolicy?: Config['cookiePolicy'];
  cookiePreferenceKey?: Config['cookiePreferenceKey'];
  setVisible(value: boolean): void;
  onPreferencesChanged: Config['onPreferencesChanged'];
}

const isAnOptionEnabled = (cookieOptions: CookieOption[]) => {
  return cookieOptions.some(cookieOption => cookieOption.isEnabled === true);
};

const Customization: FunctionalComponent<Props> = ({
  cookieOptions,
  permissionLabels,
  cookiePolicy,
  cookiePreferenceKey,
  setVisible,
  onPreferencesChanged,
}) => {
  const [options, setOptions] = useState(() => cookieOptions);
  const [isActive, setIsActive] = useState(false);
  const { setCookiePreferences } = useCookie({
    cookieOptions,
    cookiePreferenceKey,
    onPreferencesChanged,
  });
  const acceptButtonLabel = useMemo(() => {
    if (!isActive && !isAnOptionEnabled(options)) {
      return permissionLabels.acceptAll;
    }

    return permissionLabels.accept;
  }, [isActive, options, permissionLabels.accept, permissionLabels.acceptAll]);

  useEffect(() => {
    setOptions(cookieOptions);
  }, [cookieOptions]);

  const toggleOption = (key: number) => {
    options[key] = { ...options[key], isEnabled: !options[key].isEnabled };
    setOptions([...options]);
  };

  const declineAllOptions = () => {
    const declinedOptions = options.map(option => ({ ...option, isEnabled: false }));
    setOptions(declinedOptions);
    setIsActive(false);
    setVisible(false);
    setCookiePreferences({
      cookieOptions: declinedOptions.map(declinedOption => ({
        id: declinedOption.id,
        isEnabled: declinedOption.isEnabled,
      })),
      isCustomised: true,
    });
  };

  const acceptOptions = () => {
    let acceptedOptions = options.map(option => ({ ...option, isEnabled: option.isEnabled }));
    if (!isActive && !isAnOptionEnabled(options)) {
      acceptedOptions = acceptedOptions.map(option => ({ ...option, isEnabled: true }));
      setOptions(acceptedOptions);
    }

    setIsActive(false);
    setVisible(false);
    setCookiePreferences({
      cookieOptions: acceptedOptions.map(acceptedOption => ({
        id: acceptedOption.id,
        isEnabled: acceptedOption.isEnabled,
      })),
      isCustomised: true,
    });
  };

  return (
    <div>
      <ToggleButton
        isActive={isActive}
        toggleCustomization={() => setIsActive(prevState => !prevState)}
      />
      <Collapse isOpen={isActive}>
        <Options options={options} onToggle={toggleOption} cookiePolicy={cookiePolicy} />
      </Collapse>
      <div className={styles.acceptance}>
        <Button
          label={permissionLabels.decline}
          className={buttonStyles.secondary}
          onClick={declineAllOptions}
        />
        <Button label={acceptButtonLabel} onClick={acceptOptions} />
      </div>
    </div>
  );
};

export default Customization;
