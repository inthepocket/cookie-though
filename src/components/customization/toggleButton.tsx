import { FunctionalComponent, h } from 'preact';
import './css/toggleButton.css';

interface Props {
  label: string;
  isActive: boolean;
  toggleCustomization: () => void;
}

const ToggleButton: FunctionalComponent<Props> = ({ label, isActive, toggleCustomization }) => {
  const handleClick = () => {
    toggleCustomization();
  };

  return (
    <button
      className={`ct-customization-button ${isActive ? 'ct-active' : ''}`}
      onClick={handleClick}
    >
      {label}{' '}
      <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.747437 0.757812L4.28297 4.29335L7.8185 0.757811" />
      </svg>
    </button>
  );
};

export default ToggleButton;
