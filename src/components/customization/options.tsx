import { FunctionalComponent, h } from 'preact';
import Option from './option';
import styles from './css/options.css';
import { CookieOption } from '../../types';

const necessaryCookies = (
  <div className={`${styles.option} ${styles.optionSecondary}`}>
    <div className={styles.optionInfo}>
      <p>Stricly necessary cookies</p>
    </div>
    <div className={styles.optionDefault}>Always on</div>
  </div>
);

interface Props {
  options: CookieOption[];
  onToggle: (key: number) => void;
}

const Options: FunctionalComponent<Props> = ({ options, onToggle }) => {
  const optionalCookies = options.map((option, i) => (
    <Option key={i} option={option} onToggle={() => onToggle(i)} />
  ));

  return (
    <div className={styles.options}>
      {necessaryCookies}
      {optionalCookies}
      <div className={styles.declaration}>
        <a href="#">Read the full cookie declaration</a>
      </div>
    </div>
  );
};

export default Options;
