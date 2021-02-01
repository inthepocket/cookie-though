import { FunctionalComponent, h } from 'preact';
import './css/option.css';
import { CookieOption } from '../../types';
import { isEssential } from '../../utils';

interface Props {
  option: CookieOption;
  onToggle: () => void;
}

const Option: FunctionalComponent<Props> = ({ option, onToggle }) => {
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
      />
      <label htmlFor={option.id} className="ct-option-info">
        <p>
          <strong>{option.label}</strong>
          {!isEssentialCookie && option.description}
        </p>
        <span className="ct-slider">{isEssentialCookie && option.description}</span>
      </label>
    </div>
  );
};

export default Option;
