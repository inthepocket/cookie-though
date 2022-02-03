import { useMemo, useReducer, useRef } from 'preact/hooks';

import defaultConfig, { Config } from '../../config';
import { useContainer } from '../../context/container';
import { useOnPreferencesChanged } from '../../context/onPreferencesChanged';
import useAnimateDetails from '../../hooks/useAnimateDetails';
import useTransitionDuration from '../../hooks/useTransitionDuration';
import optionsReducer from '../../reducers/options';
import { getHiddenContainerBottom, toggleContainer } from '../../utils/container';
import { Consent as ConsentType, isEssential, Option as OptionType } from '../../utils/mappers';
import Option from './option';

interface Props {
  customizeLabel: string;
  optionsAriaLabel: string;
  consent: ConsentType;
  essentialLabel: string;
  permissionLabels?: Config['permissionLabels'];
  cookiePolicy: Config['cookiePolicy'];
  cookiePreferencesKey: string;
}

const isAnOptionEnabled = (options: OptionType[]) => {
  return options.some(({ category, isEnabled }) => !isEssential(category) && isEnabled === true);
};

const areAllOptionsEnabled = (options: OptionType[]) => {
  return options.every((option) => option.isEnabled);
};

const ChevronDown = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const Consent = ({
  customizeLabel,
  optionsAriaLabel,
  consent,
  essentialLabel,
  permissionLabels = defaultConfig.permissionLabels,
  cookiePolicy,
  cookiePreferencesKey,
}: Props) => {
  const [options, dispatch] = useReducer(optionsReducer, consent.options);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const { isOpen } = useAnimateDetails(detailsRef);
  const container = useContainer();
  const timeout = useTransitionDuration();
  const onPreferencesChanged = useOnPreferencesChanged();

  const acceptLabel = useMemo(() => {
    return (!isOpen && !isAnOptionEnabled(options)) || areAllOptionsEnabled(options)
      ? permissionLabels.acceptAll ?? defaultConfig.permissionLabels.acceptAll
      : permissionLabels.accept ?? defaultConfig.permissionLabels.accept;
  }, [isOpen, options, permissionLabels.accept, permissionLabels.acceptAll]);

  const closeContainer = () => {
    toggleContainer(false, getHiddenContainerBottom(container));
    if (detailsRef.current) setTimeout(() => (detailsRef.current!.open = false), timeout);
  };

  const declineAllOptions = () => {
    dispatch({ type: 'decline', cookiePreferencesKey, onPreferencesChanged });
    closeContainer();
  };

  const acceptOptions = () => {
    dispatch({
      type: 'accept',
      cookiePreferencesKey,
      areAllOptionsEnabled:
        acceptLabel === (permissionLabels.acceptAll ?? defaultConfig.permissionLabels.acceptAll),
      onPreferencesChanged,
    });
    closeContainer();
  };

  return (
    <>
      <details ref={detailsRef}>
        <summary>
          {customizeLabel}
          <ChevronDown />
        </summary>
        <div class="content" tabIndex={-1}>
          <fieldset>
            <legend class="sr-only">{optionsAriaLabel}</legend>
            {options.map((option, key) => (
              <Option
                key={key}
                option={option}
                onClick={() => dispatch({ type: 'toggle', index: key })}
                essentialLabel={essentialLabel}
              />
            ))}
          </fieldset>
          {cookiePolicy && (
            <div class="declaration">
              <a href={cookiePolicy.url}>{cookiePolicy.label}</a>
            </div>
          )}
        </div>
      </details>
      <div class="acceptance">
        <button class="button button--secondary" onClick={declineAllOptions}>
          {permissionLabels.decline ?? defaultConfig.permissionLabels.decline}
        </button>
        <button class="button button--primary" onClick={acceptOptions}>
          {acceptLabel}
        </button>
      </div>
    </>
  );
};

export default Consent;
