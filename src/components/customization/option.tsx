import { FunctionalComponent, h } from 'preact';
import './css/option.css';
import { Config, CookieOption } from '../../types';
import { isEssential } from '../../utils';

interface Props {
  isOpen: boolean;
  option: CookieOption;
  essentialLabel?: Config['essentialLabel'];
  onToggle: () => void;
}

const Option: FunctionalComponent<Props> = ({ isOpen, option, essentialLabel, onToggle }) => {
  const isEssentialCookie = isEssential(option.category);

  return (
    <div
      className={`ct-option ${option.isEnabled ? 'ct-enabled' : ''} ${
        isEssentialCookie ? 'ct-essential' : ''
      }`}
    >
      <input
        type="checkbox"
        id={option.id}
        name={option.id}
        disabled={isEssentialCookie}
        checked={option.isEnabled}
        onClick={onToggle}
        onFocus={e => e.currentTarget.parentElement!.scrollIntoView()}
        tabIndex={isOpen ? 0 : -1}
        aria-hidden={!isOpen}
      />
      <label htmlFor={option.id} className="ct-option-info">
        <p>
          <strong>{option.label}</strong>
          {option.description}
        </p>
        <span className="ct-slider">{isEssentialCookie && essentialLabel}</span>
      </label>
    </div>
  );
};

export default Option;
