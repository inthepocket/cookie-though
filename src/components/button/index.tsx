import { FunctionalComponent, h } from 'preact';
import styles from './style.css';

interface Props {
  label: string;
  className?: string;
  onClick: () => void;
}

const Button: FunctionalComponent<Props> = ({ label, className = '', onClick }) => {
  return (
    <button className={`${styles.button}  ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
