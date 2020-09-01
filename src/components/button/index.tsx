import { FunctionalComponent, h } from 'preact';
import styles from './style.css';

const Button: FunctionalComponent = () => {
  return <button class={styles.button}>Cookie consent</button>;
};

export default Button;
