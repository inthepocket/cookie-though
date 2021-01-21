import { FunctionalComponent, h } from 'preact';
import Option from './option';
import styles from './css/options.css';
import { Config, CookieOption } from '../../types';

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
  cookiePolicy?: Config['cookiePolicy'];
  onToggle: (key: number) => void;
}

const Options: FunctionalComponent<Props> = ({ options, cookiePolicy, onToggle }) => {
  const optionalCookies = options.map((option, i) => (
    <Option key={i} option={option} onToggle={() => onToggle(i)} />
  ));

  return (
    <div className={styles.options}>
      {necessaryCookies}
      {optionalCookies}
      {cookiePolicy && (
        <div className={styles.declaration}>
          <a href={cookiePolicy.url}>{cookiePolicy.label}</a>
        </div>
      )}
    </div>
  );
};

export default Options;
