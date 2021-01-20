import { FunctionalComponent, h } from 'preact';
import Slider from './slider';
import styles from './css/options.css';
import { CookieOption } from '../../types';

interface Props {
  option: CookieOption;
  onToggle: () => void;
}

const Option: FunctionalComponent<Props> = ({ option, onToggle }) => {
  return (
    <div className={`${styles.option} ${option.isEnabled ? styles.enabled : ''}`}>
      <div className={styles.optionInfo}>
        <p>{option.label}</p>
        <p>{option.description}</p>
      </div>
      <Slider isEnabled={option.isEnabled} onToggle={onToggle} />
    </div>
  );
};

export default Option;
