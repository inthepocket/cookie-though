import { FunctionalComponent, h } from 'preact';
import Option from './option';
import styles from './css/options.css';
import { Config, CookieOption } from '../../types';

interface Props {
  options: CookieOption[];
  cookiePolicy?: Config['cookiePolicy'];
  onToggle: (key: number) => void;
}

const Options: FunctionalComponent<Props> = ({ options, cookiePolicy, onToggle }) => {
  const cookies = options.map((option, i) => (
    <Option key={i} option={option} onToggle={() => onToggle(i)} />
  ));

  return (
    <div>
      {cookies}
      {cookiePolicy && (
        <div className={styles.declaration}>
          <a href={cookiePolicy.url}>{cookiePolicy.label}</a>
        </div>
      )}
    </div>
  );
};

export default Options;
