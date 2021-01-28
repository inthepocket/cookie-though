import { FunctionalComponent, h } from 'preact';
import styles from './css/option.css';
import { CookieOption } from '../../types';
import { isEssential } from '../app';

interface Props {
  option: CookieOption;
  onToggle: () => void;
}

const Option: FunctionalComponent<Props> = ({ option, onToggle }) => {
  const isEssentialCookie = isEssential(option.category);

  return (
    <div
      className={`${styles.option} ${option.isEnabled ? styles.enabled : ''} ${
        isEssentialCookie ? styles.essential : ''
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
      <label htmlFor={option.id} className={styles.optionInfo}>
        <p>
          <strong>{option.label}</strong>
          {!isEssentialCookie && option.description}
        </p>
        <span className={styles.slider}>{isEssentialCookie && option.description}</span>
      </label>
    </div>
  );
};

export default Option;
