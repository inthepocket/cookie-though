import { FunctionalComponent, h } from 'preact';
import './style.css';

interface Props {
  label: string;
  className?: string;
  onClick: () => void;
}

const Button: FunctionalComponent<Props> = ({ label, className = '', onClick }) => {
  return (
    <button className={`ct-button  ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
