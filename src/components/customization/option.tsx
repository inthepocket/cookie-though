import { FunctionalComponent, h } from 'preact';
import Slider from './slider';
import styles from './css/options.css';

export type CookieOption = {
  name: string;
  description: string;
  isEnabled: boolean;
};

interface Props {
  option: CookieOption;
  onToggle: () => void;
}

const Option: FunctionalComponent<Props> = ({ option, onToggle }) => {
  return (
    <div className={`${styles.option} ${option.isEnabled ? styles.enabled : ''}`}>
      <div className={styles.optionInfo}>
        <p>{option.name}</p>
        <p>{option.description}</p>
      </div>
      <Slider isEnabled={option.isEnabled} onToggle={onToggle} />
    </div>
  );
};

export default Option;
