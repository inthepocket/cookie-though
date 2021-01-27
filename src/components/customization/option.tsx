import { FunctionalComponent, h } from 'preact';
import styles from './css/option.css';
import { Category, CookieOption } from '../../types';

interface Props {
  option: CookieOption;
  onToggle: () => void;
}

const Option: FunctionalComponent<Props> = ({ option, onToggle }) => {
  const isEssential = option.category === Category.Essential;

  return (
    <div
      className={`${styles.option} ${option.isEnabled ? styles.enabled : ''} ${
        isEssential ? styles.essential : ''
      }`}
    >
      <input
        type="checkbox"
        id={option.id}
        name={option.id}
        disabled={isEssential}
        checked={option.isEnabled}
        onClick={onToggle}
      />
      <label htmlFor={option.id} className={styles.optionInfo}>
        <p>
          <strong>{option.label}</strong>
          {option.description}
        </p>
        <span className={styles.slider}>{isEssential && 'Always on'}</span>
      </label>
    </div>
  );
};

export default Option;
