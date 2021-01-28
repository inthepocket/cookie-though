import { FunctionalComponent, h } from 'preact';
import ToggleButton from './toggleButton';
import './css/customization.css';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Options from './options';
import Collapse from './collapse';
import Button from '../button';
import { Config, CookieOption, CookiePreferences } from '../../types';
import { isEssential } from '../app';

interface Props {
  cookieOptions: CookieOption[];
  permissionLabels: Config['permissionLabels'];
  cookiePolicy?: Config['cookiePolicy'];
  setVisible(value: boolean): void;
  setCookiePreferences(cookiePreferences: CookiePreferences): CookiePreferences;
}

const isAnOptionEnabled = (cookieOptions: CookieOption[]) => {
  return cookieOptions.some(
    cookieOption => !isEssential(cookieOption.category) && cookieOption.isEnabled === true,
  );
};

const formatCookieOptions = (cookieOptions: CookieOption[]): CookiePreferences => {
  return {
    cookieOptions: cookieOptions.map(cookieOption => ({
      id: cookieOption.id,
      isEnabled: cookieOption.isEnabled,
    })),
    isCustomised: true,
  };
};

const Customization: FunctionalComponent<Props> = ({
  cookieOptions,
  permissionLabels,
  cookiePolicy,
  setVisible,
  setCookiePreferences,
}) => {
  const [options, setOptions] = useState(() => cookieOptions);
  const [isActive, setIsActive] = useState(false);
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
    const declinedOptions = options.map(option => ({
      ...option,
      isEnabled: isEssential(option.category) ? true : false,
    }));
    setOptions(declinedOptions);
    setIsActive(false);
    setVisible(false);
    setCookiePreferences(formatCookieOptions(declinedOptions));
  };

  const acceptOptions = () => {
    let acceptedOptions = options.map(option => ({ ...option, isEnabled: option.isEnabled }));
    if (!isActive && !isAnOptionEnabled(options)) {
      acceptedOptions = acceptedOptions.map(option => ({ ...option, isEnabled: true }));
      setOptions(acceptedOptions);
    }

    setIsActive(false);
    setVisible(false);
    setCookiePreferences(formatCookieOptions(acceptedOptions));
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
      <div className="ct-acceptance">
        <Button
          label={permissionLabels.decline}
          className="ct-button-secondary"
          onClick={declineAllOptions}
        />
        <Button label={acceptButtonLabel} onClick={acceptOptions} />
      </div>
    </div>
  );
};

export default Customization;
